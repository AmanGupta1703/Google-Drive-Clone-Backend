import type { Response } from 'express'
import { Types } from 'mongoose'

import { Folder } from '../models/folder.model.js'
import { File } from '../models/file.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js'
import { ApiError } from '../utils/ApiError.js'
import { HttpStatus } from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const createFolder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req?.user

    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'You need to be logged in to create a folder.'
      )
    }

    const { name, parentId } = req.body

    if (!name) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Folder name is required.')
    }

    if (
      parentId in req.body &&
      parentId !== 'null' &&
      parentId !== 'undefined' &&
      parentId
    ) {
      const parent = await Folder.findOne({ _id: parentId, owner: user._id })
      if (!parent) {
        throw new ApiError(HttpStatus.NOT_FOUND, 'Parent folder not found.')
      }
    }

    const existingFolder = await Folder.findOne({
      owner: user._id,
      name: name.trim(),
    })

    if (existingFolder) {
      throw new ApiError(
        HttpStatus.CONFLICT,
        'Folder with this name already exists.'
      )
    }

    const newFolder = await Folder.create({
      name: name.trim(),
      owner: user._id,
      parent: parentId || null,
    })

    if (!newFolder) {
      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create folder.'
      )
    }

    return res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse(
          HttpStatus.CREATED,
          newFolder,
          'New folder created successfully.'
        )
      )
  }
)

export { createFolder }
