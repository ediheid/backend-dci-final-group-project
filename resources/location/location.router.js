import { Router } from 'express'
import { findAllLocations, findLocation, createLocation, updateLocation, deleteLocation } from './location.controllers'

const router = Router()

router.get('/', findAllLocations)

router.get('/:id', findLocation)
router.post('/:id', createLocation)
router.put('/:id', updateLocation)
router.delete('/:id', deleteLocation)

export default router