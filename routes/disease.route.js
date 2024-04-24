import { Router } from "express";
import { DiseaseController } from "../controllers/disease.controller.js";

export const DiseaseRouter = Router ()

//obtener todas las enfermedades
DiseaseRouter.get('/', DiseaseController.getAll)
//crear una enfermedad
DiseaseRouter.post('/', DiseaseController.create)
//actualizar
DiseaseRouter.patch('/:idDisease',DiseaseController.update)
//eliminar una enfermedad
DiseaseRouter.delete('/:idDisease',DiseaseController.delete)