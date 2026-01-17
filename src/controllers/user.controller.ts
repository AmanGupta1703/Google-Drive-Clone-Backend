import type { Request, Response } from 'express'

import User from '../models/user.model.js'

import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { HttpStatus } from '../utils/HttpStatus.js'

import type { IUser } from '../models/interfaces/IUser.js'

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body

  if ([fullName, email, password].some((val) => val?.trim() === '')) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'All fields are required')
  }

  const existingUser = await User.findOne({
    email,
  })

  if (existingUser) {
    throw new ApiError(HttpStatus.CONFLICT, 'Email address already registered')
  }

  const createdUser = await User.create({ email, fullName, password })

  if (!createdUser) {
    throw new ApiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong while registering the user'
    )
  }

  return res
    .status(HttpStatus.CREATED)
    .json(
      new ApiResponse<IUser>(
        HttpStatus.OK,
        createdUser,
        'User registered successfully'
      )
    )
})

export { createUser }
