import { Router } from 'express'
import {
  getContent,
  moveContent,
  searchContent,
} from '../controllers/directory.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyJWT)

router.route('/content').get(getContent)
router.route('/search').get(searchContent)
router.route('/move').patch(moveContent)

export default router
