import { Request, NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    // @ts-ignore
    const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    // @ts-ignore
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // @ts-ignore
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: 'Not authorized' })
  }
}
