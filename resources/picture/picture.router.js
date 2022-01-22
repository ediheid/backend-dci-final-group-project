import { Router } from 'express'
import { findPicture } from './picture.controllers.js'

const router = Router()

router.get('/:id',findPicture)

export default router