import type { Response } from 'express'

import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { File } from '../models/file.model.js'
import { Folder } from '../models/folder.model.js'
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { HttpStatus } from '../utils/HttpStatus.js'

const getContent = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req?.user

    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'You need to be logged in to get files.'
      )
    }

    const { folderId } = req.query

    if (folderId) {
      const folder = await Folder.findOne({
        _id: folderId,
        owner: user._id,
      })

      if (!folder) {
        throw new ApiError(HttpStatus.NOT_FOUND, 'Folder not found.')
      }
    }

    const [files, folders] = await Promise.all([
      File.find({ owner: user._id, folder: folderId || null }),
      Folder.find({ owner: user._id, parent: folderId || null }),
    ])

    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          { files, folders },
          'Files and folders fetched successfully.'
        )
      )
  }
)

const searchContent = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req?.user

    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'You need to be logged in to get files.'
      )
    }

    const { q } = req.query

    if (!q || typeof q !== 'string' || q.trim() === '') {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Query string is required')
    }

    if (q.length < 2) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          new ApiResponse(
            HttpStatus.BAD_REQUEST,
            {},
            'Query must be at least 2 characters long'
          )
        )
    }

    const searchFilter = {
      owner: user._id,
      name: { $regex: q, $options: 'i' },
    }

    const [folders, files] = await Promise.all([
      Folder.find(searchFilter).lean(),
      File.find(searchFilter).lean(),
    ])

    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          { folders, files },
          'Search completed successfully.'
        )
      )
  }
)

export { getContent, searchContent }
