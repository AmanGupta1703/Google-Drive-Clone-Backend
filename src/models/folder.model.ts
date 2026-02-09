import mongoose from 'mongoose'

import type { IFolder } from './interfaces/IFolder.js'

const folderSchema = new mongoose.Schema<IFolder>(
  {
    name: {
      type: String,
      required: [true, 'Folder name is required'],
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    /**
     * If the parent is null, the item is in the user's root directory.
     **/
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      default: null,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

/**
 * INDEXING
 * - This makes it faster to fetch all items in a specific folder for a user.
 **/
folderSchema.index({ owner: 1, parent: 1 })

export const Folder = mongoose.model('Folder', folderSchema)
