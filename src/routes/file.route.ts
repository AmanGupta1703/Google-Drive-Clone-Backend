import { Router } from 'express'

import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import {
  deleteFile,
  getStarredContent,
  renameFile,
  toggleStarFile,
  uploadFile,
  getFileDetails,
} from '../controllers/file.controller.js'

const router = Router()

router.use(verifyJWT)

router.route('/upload').post(upload.single('file'), uploadFile)
router.route('/star/:fileId').patch(toggleStarFile)
router.route('/starred').get(getStarredContent)

router
  .route('/:fileId')
  .get(getFileDetails)
  .patch(renameFile)
  .delete(deleteFile)

export default router
