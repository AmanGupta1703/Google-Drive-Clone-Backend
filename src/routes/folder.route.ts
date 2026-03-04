import { Router } from 'express'

import {
  createFolder,
  getFolderContent,
} from '../controllers/folder.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyJWT)

router.route('/').post(createFolder)
router.route('/').get(getFolderContent) // <-- Root
router.route('/:folderId').get(getFolderContent) // <-- Inside a folder

export default router
