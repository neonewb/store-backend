import express from "express";
import { brandController } from "../controllers/brandController";

export const brandRouter = express.Router()

brandRouter.post('/', brandController.create)
brandRouter.get('/', brandController.getAll)
