import fs from 'node:fs'

import type { Response } from 'express'

import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { File } from '../models/file.model.js'
import { Storage } from '../models/storage.model.js'
import { Folder } from '../models/folder.model.js'
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { HttpStatus } from '../utils/HttpStatus.js'

const uploadFile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req?.user

    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'You need to be logged in to upload a file.'
      )
    }

    const localFilePath = req.file?.path

    if (!localFilePath) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST,
        'No file was uploaded. Please attach a file and try again.'
      )
    }

    const folderId =
      req.body.folderId === 'null' || req.body.folderId === 'undefined'
        ? null
        : req.body.folderId

    if (folderId) {
      const folder = await Folder.findOne({
        _id: folderId,
        owner: user._id,
      })

      if (!folder) {
        throw new ApiError(HttpStatus.NOT_FOUND, 'Folder not found.')
      }
    }

    const existingFile = await File.findOne({
      name: req.file?.originalname as string,
      owner: user._id,
      folder: folderId,
    })

    if (existingFile) {
      fs.unlinkSync(req.file?.path as string)
      throw new ApiError(
        HttpStatus.CONFLICT, // 409 Conflict is the standard for duplicates
        'A file with this name already exists in this folder.'
      )
    }

    const storage = await Storage.findOneAndUpdate(
      { owner: user._id },
      { owner: user._id },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )

    if (!storage) {
      throw new ApiError(
        HttpStatus.NOT_FOUND,
        'Storage with user id not found.'
      )
    }

    const usedStorage = storage.usedStorage
    const totalCapacity = storage.totalCapacity

    const fileSize = req.file?.size as number

    const willExceedStorageCapacity = usedStorage + fileSize > totalCapacity

    if (willExceedStorageCapacity) {
      fs.unlinkSync(req.file?.path as string)
      throw new ApiError(
        HttpStatus.FORBIDDEN,
        'Upload denied. Storage quota exceeded.'
      )
    }

    const cloudinaryFile = await uploadOnCloudinary(localFilePath)

    if (!cloudinaryFile) {
      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to upload file to Cloudinary'
      )
    }

    await Storage.findByIdAndUpdate(storage._id, {
      $inc: { usedStorage: cloudinaryFile.bytes },
    })

    const mimeType =
      cloudinaryFile.resource_type === 'raw'
        ? 'application/octet-stream'
        : cloudinaryFile.format === 'pdf'
          ? 'application/pdf'
          : `${cloudinaryFile.resource_type}/${cloudinaryFile.format}`

    const uploadedFile = await File.create({
      owner: user._id,
      folder: folderId,
      size: cloudinaryFile.bytes,
      mimeType,
      fileUrl: cloudinaryFile.url,
      publicId: cloudinaryFile.public_id,
      name: req.file?.originalname as string,
    })

    return res
      .status(HttpStatus.CREATED)
      .json(
        new ApiResponse(
          HttpStatus.CREATED,
          uploadedFile,
          'File uploaded successfully.'
        )
      )
  }
)

const getFiles = asyncHandler(
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

export { uploadFile, getFiles }
