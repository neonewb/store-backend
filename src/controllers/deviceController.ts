import { NextFunction, Request, Response } from 'express'
import { nanoid } from 'nanoid'
import { Device } from '../models/models'
import { ApiError } from '../error/ApiError'
import path from 'path'

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, brandId, typeId, info } = req.body
      // @ts-ignore
      const { img } = req.files
      let fileName = nanoid() + '.jpg'
      img.mv(path.resolve(__dirname, '..', '..', 'static', fileName))

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      })

      return res.json(device)
    } catch (error) {
      const err = ApiError.badRequest(error.message)    
      next(err)
    }
  }

  async getAll(req: Request, res: Response) {}

  async getOne(req: Request, res: Response) {}
}

export const deviceController = new DeviceController()
