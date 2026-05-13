import { Router } from 'express'
import { searchContent } from '../controllers/directory.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(verifyJWT)

router.route('/search').get(searchContent)

export default router
