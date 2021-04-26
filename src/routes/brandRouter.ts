import express from 'express'
import { brandController } from '../controllers/brandController'
import { checkRole } from '../middleware/checkRoleMiddleware'

export const brandRouter = express.Router()

brandRouter.post('/', checkRole('Admin'), brandController.create)
brandRouter.get('/', brandController.getAll)
