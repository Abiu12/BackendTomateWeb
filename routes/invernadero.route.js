import { Router } from "express";
import { InvernaderoController } from "../controllers/invernadero.controller.js";

export const InvernaderoRouter = Router ()


InvernaderoRouter.get('/', InvernaderoController.getAll)

InvernaderoRouter.get('/:id',InvernaderoController.getById)

InvernaderoRouter.post('/', InvernaderoController.create)

InvernaderoRouter.delete('/:id',InvernaderoController.delete)