import { Router } from "express";
import { PlagaController } from "../controllers/plaga.controller.js";
export const PlagaRouter = Router ()

//obtener todas las plagas
PlagaRouter.get('/', PlagaController.getAll)
//obtener una una plaga por id
PlagaRouter.get('/:id',PlagaController.getById)
//crear una plaga
PlagaRouter.post('/', PlagaController.create)
//eliminar una plaga
PlagaRouter.delete('/:id',PlagaController.delete)