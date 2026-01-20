import type { Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'

import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { HttpStatus } from '../utils/HttpStatus.js'
import config from '../config/index.js'
import User from '../models/user.model.js'
import type { IUser } from '../models/interfaces/IUser.js'

export interface AuthJwtPayload extends JwtPayload {
  _id: Types.ObjectId
}

export interface AuthenticatedRequest extends Request {
  user?: IUser
}

const verifyJWT = asyncHandler(async (req: Request, _, next: NextFunction) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized request')
    }

    const decodedToken = jwt.verify(
      token,
      config.auth.accessToken.secret
    ) as AuthJwtPayload

    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    )

    if (!user) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Token is invalid or used')
    }

    ;(req as AuthenticatedRequest).user = user
    next()
  } catch (error) {
    throw new ApiError(
      HttpStatus.UNAUTHORIZED,
      error instanceof Error ? error.message : 'Invalid access token'
    )
  }
})

export { verifyJWT }
