import { Router } from 'express'

import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { uploadFile } from '../controllers/file.controller.js'
import { getContent } from '../controllers/directory.controller.js'

const router = Router()

router.use(verifyJWT)

router.route('/upload').post(upload.single('file'), uploadFile)
router.route('/content').get(getContent)

export default router
