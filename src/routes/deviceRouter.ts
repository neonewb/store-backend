import express from "express";
import { deviceController } from "../controllers/deviceController";

export const deviceRouter = express.Router()

deviceRouter.post('/',deviceController.create)
deviceRouter.get('/', deviceController.getAll)
deviceRouter.get('/:id', deviceController.getOne)
