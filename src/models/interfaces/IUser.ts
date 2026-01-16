import { Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  fullName: string
  avatar?: string
  refreshToken?: string
  createdAt: Date
  updatedAt: Date
}
