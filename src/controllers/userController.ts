import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../error/ApiError'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User, Basket } from '../models/models'

const generateJwt = (id: number, email: string, role: string) => {
  // @ts-ignore
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  })
}

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { email, password, role } = req.body

    if (!email || !password) {
      return next(ApiError.badRequest('Email or password invalid'))
    }

    const candidate = await User.findOne({ where: { email } })

    if (candidate) {
      return next(ApiError.badRequest('User with this email already exist'))
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashedPassword })
    const basket = await Basket.create({ userId: user.id })
    const token = generateJwt(user.id, user.email, user.role)

    return res.json({ token })
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return next(ApiError.internal('User undefined'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword) {
      return next(ApiError.internal('Wrong password'))
    }

    const token = generateJwt(user.id, user.email, user.role)

    return res.json({ token })
  }

  async checkAuth(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

export const userController = new UserController()
