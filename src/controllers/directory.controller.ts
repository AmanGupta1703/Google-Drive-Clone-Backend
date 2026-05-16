import type { Response } from 'express'

import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { File } from '../models/file.model.js'
import { Folder } from '../models/folder.model.js'
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { HttpStatus } from '../utils/HttpStatus.js'
import { isDescendant } from '../utils/helper.js'
import type { MoveFileItem } from './types/index.js'

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
        owner: user._id,
        _id: folderId as string,
      })

      if (!folder) {
        throw new ApiError(HttpStatus.NOT_FOUND, 'Folder not found.')
      }
    }

    const [files, folders] = await Promise.all([
      File.find({ owner: user._id, folder: (folderId as string) || null }),
      Folder.find({ owner: user._id, parent: (folderId as string) || null }),
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

const moveContent = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req?.user

    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'You need to be logged in to get files.'
      )
    }

    const { targetId, destinationId, type }: MoveFileItem = req.body

    const requiredFields = { targetId, destinationId, type }

    const emptyFields = Object.entries(requiredFields)
      .filter(([, value]) => typeof value !== 'string' || value.trim() === '')
      .map(([key]) => key)

    if (emptyFields.length > 0) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        `Missing or empty fields: ${emptyFields.join(', ')}`
      )
    }

    if (targetId === destinationId) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'Source and destination cannot be the same.'
      )
    }

    if (type === 'FILE') {
      const file = await File.find({
        _id: targetId as string,
        owner: user._id,
      }).lean()

      if (!file) {
        throw new ApiError(HttpStatus.NOT_FOUND, 'File not found')
      }

      const folder = await Folder.findOne({
        _id: destinationId,
        owner: user._id,
      }).lean()

      if (!folder) {
        throw new ApiError(HttpStatus.NOT_FOUND, 'Folder not found.')
      }

      const updatedFile = await File.findOneAndUpdate(
        { _id: targetId as string, owner: user._id },
        { $set: { folder: folder._id } },
        { new: true }
      )

      if (!updatedFile) {
        throw new ApiError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Failed to update file'
        )
      }

      const { name, folder: parent, _id } = updatedFile

      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse(
            HttpStatus.OK,
            { name, folder: parent, _id },
            'File moved successfully.'
          )
        )
    }

    const [targetFolder, destinationFolder] = await Promise.all([
      Folder.findOne({
        _id: targetId,
        owner: user._id,
      }),
      Folder.findOne({
        _id: destinationId,
        owner: user._id,
      }),
    ])

    if (!destinationFolder || !targetFolder) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Folder not found.')
    }

    const isTargetFolderDescendent = await isDescendant(
      targetFolder,
      destinationFolder,
      user
    )
    if (isTargetFolderDescendent) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'A folder cannot be moved into one of its descendant folders.'
      )
    }

    const updatedFolder = await Folder.findOneAndUpdate(
      { _id: targetId as string, owner: user._id },
      { $set: { parent: destinationFolder._id } },
      { new: true }
    )

    if (!updatedFolder) {
      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update file'
      )
    }

    const { name, parent, _id } = updatedFolder

    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          { name, parent, _id },
          'Folder moved successfully.'
        )
      )
  }
)

export { getContent, searchContent, moveContent }
