import { Schema, model, Model, Types } from 'mongoose'
import type { HydratedDocument } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { Secret, SignOptions } from 'jsonwebtoken'

import type { IUser } from './interfaces/IUser.js'
import config from '../config/index.js'

/**
 * User schema definition for MongoDB.
 *
 * Represents an application user with authentication
 * and profile-related information.
 */
const userSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },

    /**
     * Unique email address.
     * Always stored in lowercase.
     */
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },

    /**
     * Hashed password (never store plaintext).
     * Excluded from query results by default.
     */
    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    /**
     * Automatically generated avatar based on the user's email.
     */
    avatar: {
      type: String,
      default: function (this: IUser) {
        // Using the email ensures the avatar is unique to this user
        return `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(this.email)}`
      },
    },

    /**
     * Refresh token used for rotating JWT sessions.
     * May be null if the user is logged out.
     */
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.index({ email: 1 }, { unique: true })

userSchema.pre('save', async function (this: HydratedDocument<IUser>) {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  const payload: { _id: Types.ObjectId } = { _id: this._id }
  const secret = config.auth.accessToken.secret as Secret
  const options = {
    expiresIn: config.auth.accessToken.expiry,
  } as SignOptions

  return jwt.sign(payload, secret, options)
}

userSchema.methods.generateRefreshToken = function () {
  const payload: { _id: Types.ObjectId } = { _id: this._id }
  const secret = config.auth.refreshToken.secret as Secret
  const options = {
    expiresIn: config.auth.refreshToken.expiry,
  } as SignOptions

  return jwt.sign(payload, secret, options)
}

/**
 * User model.
 *
 * @type {Model<IUser>}
 */
const User: Model<IUser> = model<IUser>('User', userSchema)

export default User
