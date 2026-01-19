import type { Request, Response } from 'express'
import { Types } from 'mongoose'

import User from '../models/user.model.js'

import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { HttpStatus } from '../utils/HttpStatus.js'

import type { IUser } from '../models/interfaces/IUser.js'
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js'
import { secureHeapUsed } from 'node:crypto'

const generateAccessAndRefreshToken = async (userId: Types.ObjectId) => {
  try {
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found')
    }

    const refreshToken = user.generateRefreshToken()
    const accessToken = user.generateAccessToken()

    user.refreshToken = refreshToken
    user.save({ validateBeforeSave: false })

    return { refreshToken, accessToken }
  } catch (error) {
    throw new ApiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong while generating referesh and access token'
    )
  }
}

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

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, 'All fields are required')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid email or password')
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid email or password')
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  )

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(HttpStatus.OK)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        HttpStatus.OK,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        'User logged In Successfully'
      )
    )
})

const logout = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    )

    const options = {
      httpOnly: true,
      secure: true,
    }

    res
      .status(HttpStatus.OK)
      .clearCookie('accessToken', options)
      .clearCookie('refreshToken', options)
      .json(new ApiResponse(HttpStatus.OK, {}, 'User logged out successfully'))
  }
)

export { createUser, login, logout }
