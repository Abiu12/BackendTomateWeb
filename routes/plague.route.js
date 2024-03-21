import { Router } from "express";
import { PlagueController } from "../controllers/plague.controller.js";
export const PlagueRouter = Router ()

//obtener todas las plagas
PlagueRouter.get('/', PlagueController.getAll)
//obtener una una plaga por id
PlagueRouter.get('/:id',PlagueController.getById)
//crear una plaga
PlagueRouter.post('/', PlagueController.create)
//eliminar una plaga
PlagueRouter.delete('/:id',PlagueController.delete)