import { Document } from 'mongoose'

interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>
  generateAccessToken(): string
  generateRefreshToken(): string
}

export interface IUser extends Document, IUserMethods {
  email: string
  password: string
  fullName: string
  avatar?: string
  refreshToken?: string
  createdAt: Date
  updatedAt: Date
}
