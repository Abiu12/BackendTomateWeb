import { Router } from "express";
import { DiseaseController } from "../controllers/disease.controller.js";

export const DiseaseRouter = Router ()

//obtener todas las enfermedades
DiseaseRouter.get('/', DiseaseController.getAll)
//obtener una una enfermedad por id
// DiseaseRouter.get('/:id',DiseaseController.getById)
//crear una enfermedad
DiseaseRouter.post('/', DiseaseController.create)
//eliminar una enfermedad
// DiseaseRouter.delete('/:id',DiseaseController.delete)