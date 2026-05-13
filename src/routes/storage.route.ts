import { Router } from 'express'

import { verifyJWT } from '../middlewares/auth.middleware.js'
import { getStorageStats } from '../controllers/storage.controller.js'

const router = Router()

router.use(verifyJWT)

router.route('/storage-stats').get(getStorageStats)

export default router
