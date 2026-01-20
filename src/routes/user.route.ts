import express from 'express'

import {
  createUser,
  login,
  logout,
  refreshAccessToken,
} from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route('/register').post(createUser)
router.route('/login').post(login)

// Private Routes
router.route('/logout').post(verifyJWT, logout)
router.route('/refresh-token').post(verifyJWT, refreshAccessToken)

export default router
