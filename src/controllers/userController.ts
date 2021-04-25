import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../error/ApiError'

class UserController {
  async registration(req: Request, res: Response) {}

  async login(req: Request, res: Response) {}

  async checkAuth(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query
    if (!id) {
      const error = ApiError.badRequest('ID is undefined')      
      return next(error)
    }
    res.json()
  }
}

export const userController = new UserController()
