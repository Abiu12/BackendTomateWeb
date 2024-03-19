import { Router } from "express";
import { EnfermedadController } from "../controllers/enfermedad.controller.js";

export const EnfermedadRouter = Router ()

//obtener todas las enfermedades
EnfermedadRouter.get('/', EnfermedadController.getAll)
//obtener una una enfermedad por id
EnfermedadRouter.get('/:id',CamaController.getById)
//crear una enfermedad
EnfermedadRouter.post('/', CamaController.create)
//eliminar una enfermedad
EnfermedadRouter.delete('/:id',CamaController.delete)