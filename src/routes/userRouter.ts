import express from 'express'
import { userController } from '../controllers/userController'

export const userRouter = express.Router()

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.get('/auth', userController.checkAuth)
