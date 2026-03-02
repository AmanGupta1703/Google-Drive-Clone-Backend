import { Router } from 'express'

import { createFolder } from '../controllers/folder.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyJWT)

router.route('/').post(createFolder)

export default router
