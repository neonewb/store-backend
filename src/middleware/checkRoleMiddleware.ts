import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      // @ts-ignore
      const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
      if (!token) {
        return res.status(401).json({ message: 'Не авторизован' })
      }
      // @ts-ignore
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      // @ts-ignore
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Нет доступа' })
      }
      // @ts-ignore
      req.user = decoded
      next()
    } catch (e) {
      res.status(401).json({ message: 'Не авторизован' })
    }
  }
}
