import { Router } from 'express'

import { createFolder } from '../controllers/folder.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { getContent } from '../controllers/directory.controller.js'

const router = Router()

router.use(verifyJWT)

router.route('/').post(createFolder)
router.route('/').get(getContent) // <-- Root

export default router
