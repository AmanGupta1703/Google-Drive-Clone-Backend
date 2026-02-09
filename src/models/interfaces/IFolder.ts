import { Document, Types } from 'mongoose'

/**
 * Interface representing the Folder Document
 */
export interface IFolder extends Document {
  name: string
  owner: Types.ObjectId // <-- User model Reference
  parent: Types.ObjectId | null // <-- Folder model Reference (Self Reference)
  isStarred: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}
