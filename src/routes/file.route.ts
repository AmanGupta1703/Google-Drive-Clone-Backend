import { Router } from 'express'

import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { getFiles, uploadFile } from '../controllers/file.controller.js'

const router = Router()

router.use(verifyJWT)

router.route('/upload').post(upload.single('file'), uploadFile)
router.route('/content').get(getFiles)

export default router
