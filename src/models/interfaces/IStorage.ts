import { Document, Types } from 'mongoose'

/**
 * Interface representing the Storage Document
 */

export interface IStorage extends Document {
  owner: Types.ObjectId
  usedStorage: number
  totalCapacity: number
  createdAt: Date
  updatedAt: Date
}
