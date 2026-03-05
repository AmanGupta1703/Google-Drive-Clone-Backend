import mongoose from 'mongoose'

import type { IStorage } from './interfaces/IStorage.js'

const storageSchema = new mongoose.Schema<IStorage>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    usedStorage: {
      type: Number,
      default: 0,
    },
    totalCapacity: {
      type: Number,
      default: 524288000, // <-- 500 MB
    },
  },
  {
    timestamps: true,
  }
)

export const Storage = mongoose.model('Storage', storageSchema)
