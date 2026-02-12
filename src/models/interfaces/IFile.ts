import { Document, Types } from 'mongoose'

/**
 * Interface representing the File Document
 */
export interface IFile extends Document {
  name: string
  owner: Types.ObjectId // <-- User model Reference
  folder: Types.ObjectId | null // <-- Folder model Reference
  size: number
  mimeType: string
  fileUrl: string
  publicId: string
  isStarred: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}
