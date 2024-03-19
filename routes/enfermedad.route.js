import { Router } from "express";
import { EnfermedadController } from "../controllers/enfermedad.controller.js";

export const EnfermedadRouter = Router ()

//obtener todas las enfermedades
EnfermedadRouter.get('/', EnfermedadController.getAll)
//obtener una una enfermedad por id
EnfermedadRouter.get('/:id',EnfermedadController.getById)
//crear una enfermedad
EnfermedadRouter.post('/', EnfermedadController.create)
//eliminar una enfermedad
EnfermedadRouter.delete('/:id',EnfermedadController.delete)