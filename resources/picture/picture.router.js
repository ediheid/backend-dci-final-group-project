import { Router } from 'express'
import { createPicture, findPicture } from './picture.controllers.js'
import upload from '../../middleware/upload.js'

const router = Router()

router.get('/:id',findPicture)
router.post('/',upload.single('hostImage'),createPicture)

export default router