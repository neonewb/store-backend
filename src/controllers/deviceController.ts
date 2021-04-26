import { NextFunction, Request, Response } from 'express'
import { nanoid } from 'nanoid'
import { Device, DeviceInfo } from '../models/models'
import { ApiError } from '../error/ApiError'
import path from 'path'

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, brandId, typeId, info: jInfo } = req.body
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

      if (jInfo) {
        const info = JSON.parse(jInfo)
        // @ts-ignore
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            // @ts-ignore
            deviceId: device.id,
          })
        )
      }

      return res.json(device)
    } catch (error) {
      const err = ApiError.badRequest(error.message)
      next(err)
    }
  }

  async getAll(req: Request, res: Response) {
    let { brandId, typeId, limit = 10, page = 1 } = req.query
    limit = Number(limit)
    page = Number(page)

    const offset = page * limit - limit

    let devices

    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      })
    }

    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      })
    }

    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      })
    }

    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset })
    }

    return res.json(devices)
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params

    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    })

    return res.json(device)
  }
}

export const deviceController = new DeviceController()
