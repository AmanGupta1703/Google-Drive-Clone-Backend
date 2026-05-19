import { Router } from 'express'

import {
  createFolder,
  renameFolder,
  getFolderDetails,
  deleteFolder,
} from '../controllers/folder.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyJWT)

router.route('/').post(createFolder)
router
  .route('/:folderId')
  .get(getFolderDetails)
  .patch(renameFolder)
  .delete(deleteFolder)

export default router
