import express from 'express'

import { createUser, login } from '../controllers/user.controller.js'

const router = express.Router()

router.route('/register').post(createUser)

router.route('/login').post(login)

export default router
