import { Router } from "express";
import { TrabajadorInvernaderoController } from "../controllers/trabajadorinvernadero.controller.js";

export const TrabajadorInvernaderoRouter = Router()

TrabajadorInvernaderoRouter.get('/',TrabajadorInvernaderoController.getAll)
TrabajadorInvernaderoRouter.get('/:id',TrabajadorInvernaderoController.getById)
TrabajadorInvernaderoRouter.post('/',TrabajadorInvernaderoController.create)
TrabajadorInvernaderoRouter.delete('/:id',TrabajadorInvernaderoController.delete)