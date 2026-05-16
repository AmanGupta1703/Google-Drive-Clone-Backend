import { Router } from 'express'
import {
  moveContent,
  searchContent,
} from '../controllers/directory.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyJWT)

router.route('/search').get(searchContent)
router.route('/move').patch(moveContent)

export default router
