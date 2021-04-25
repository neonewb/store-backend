import express from "express";
import { typeController } from "../controllers/typeController";

export const typeRouter = express.Router()

typeRouter.post('/', typeController.create)
typeRouter.get('/', typeController.getAll)
