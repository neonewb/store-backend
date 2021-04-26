import express from 'express'
import { deviceController } from '../controllers/deviceController'
import { checkRole } from '../middleware/checkRoleMiddleware'

export const deviceRouter = express.Router()

deviceRouter.post('/', checkRole('Admin'), deviceController.create)
deviceRouter.get('/', deviceController.getAll)
deviceRouter.get('/:id', deviceController.getOne)
