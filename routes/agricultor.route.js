import { Router } from "express";
import { AgricultorController } from "../controllers/agricultor.controller.js";

export const AgricultorRouter = Router ()

//obtener todos los agricultores
AgricultorRouter.get('/', AgricultorController.getAll)
//obtener un agricultor por id
AgricultorRouter.get('/:id',AgricultorController.getById)
//crear agricultor
AgricultorRouter.post('/', AgricultorController.create)
//eliminar agricultor
AgricultorRouter.delete('/:id',AgricultorController.delete)