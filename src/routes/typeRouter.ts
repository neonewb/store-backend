import express from "express";
import { typeController } from "../controllers/typeController";
import { checkRole } from "../middleware/checkRoleMiddleware";

export const typeRouter = express.Router()

typeRouter.post('/', checkRole('Admin'), typeController.create)
typeRouter.get('/', typeController.getAll)
