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

const renameFolder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req?.user

    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'You need to be logged in to create a folder.'
      )
    }

    const { newName } = req.body
    const { folderId } = req.params

    if (!newName) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'New name is required.')
    }

    const existingFolder = await Folder.findOne({
      _id: folderId as string,
      owner: user._id,
    })

    if (!existingFolder) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Folder does not exist.')
    }

    const duplicateFoldername = await Folder.findOne({
      _id: { $ne: folderId as string },
      owner: user._id,
      parent: existingFolder.parent,
      name: newName.trim(),
    })

    if (duplicateFoldername) {
      throw new ApiError(
        HttpStatus.CONFLICT,
        'A folder with this name already exists in this folder.'
      )
    }

    existingFolder.name = newName

    const updatedFolder = await existingFolder.save()

    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          updatedFolder,
          'Folder name updated successfully.'
        )
      )
  }
)

const getFolderDetails = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req?.user

    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'You need to be logged in to view folder details.'
      )
    }

    const { folderId } = req.params

    const folder = await Folder.findOne({
      _id: folderId as string,
      owner: user._id,
    }).lean()

    if (!folder) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Folder not found.')
    }

    const [totalFolders, totalFiles] = await Promise.all([
      Folder.find({
        owner: user._id,
        parent: folderId as string,
      }).countDocuments(),
      File.find({
        owner: user._id,
        folder: folderId as string,
      }).countDocuments(),
    ])

    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          { folder, folders: totalFolders, files: totalFiles },
          'Folder information retrieved successfully.'
        )
      )
  }
)

export { createFolder, renameFolder, getFolderDetails }
