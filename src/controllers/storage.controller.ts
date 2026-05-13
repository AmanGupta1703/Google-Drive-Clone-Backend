import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js'
import type { Response } from 'express'
import { Storage } from '../models/storage.model.js'
import { HttpStatus } from '../utils/HttpStatus.js'
import { bytesToGB, getUsedPercentage } from '../utils/helper.js'

const getStorageStats = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req?.user

    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'You need to be logged in to view folder details.'
      )
    }

    const storage = await Storage.findOne({ owner: user._id }).lean()

    if (!storage) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Storage not found.')
    }

    const percentageUsed = `${getUsedPercentage(storage.totalCapacity, storage.usedStorage).toFixed(2)}%`
    const totalCapacity = bytesToGB(storage.totalCapacity)
    const usedStorage = bytesToGB(storage.usedStorage)

    return res
      .status(HttpStatus.OK)
      .json(
        new ApiResponse(
          HttpStatus.OK,
          { percentageUsed, totalCapacity, usedStorage },
          'Storage details fetched successfully.'
        )
      )
  }
)

export { getStorageStats }
