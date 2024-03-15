import { Router } from "express";
import { TrabajadorController } from "../controllers/trabajador.controller.js";

export const TrabajadorRouter = Router()

TrabajadorRouter.get('/',TrabajadorController.getAll)
TrabajadorRouter.get('/:id',TrabajadorController.getById)
TrabajadorRouter.post('/',TrabajadorController.create)
TrabajadorRouter.delete('/:id',TrabajadorController.delete)