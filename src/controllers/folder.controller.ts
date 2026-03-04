import type { Response } from 'express'

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

    if (parentId) {
      const parent = await Folder.findOne({ _id: parentId, owner: user._id })
      if (!parent) {
        throw new ApiError(HttpStatus.NOT_FOUND, 'Parent folder not found.')
      }
    }

    const newFolder = await Folder.create({
      name,
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

const getFolderContent = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { folderId } = req.params
    const user = req?.user

    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'You need to be logged in to create a folder.'
      )
    }

    if (folderId) {
      const folder = await Folder.findOne({ _id: folderId, owner: user._id })
      if (!folder) {
        throw new ApiError(HttpStatus.NOT_FOUND, 'Folder not found.')
      }
    }
    const [folders, files] = await Promise.all([
      Folder.find({ parent: folderId || null, owner: user._id }),
      File.find({ folder: folderId || null, owner: user._id }),
    ])

    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          { folders, files },
          'Content fetched successfully.'
        )
      )
  }
)

export { createFolder, getFolderContent }
