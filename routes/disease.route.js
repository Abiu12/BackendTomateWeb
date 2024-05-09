import { Router } from "express";
import { DiseaseController } from "../controllers/disease.controller.js";

export const DiseaseRouter = Router();

//obtener todas las enfermedades
DiseaseRouter.get("/", DiseaseController.getAll);
//Obtener una plaga por id
DiseaseRouter.get("/:idDisease", DiseaseController.getById);
//crear una enfermedad
DiseaseRouter.post("/", DiseaseController.create);
//actualizar
DiseaseRouter.patch("/:idDisease", DiseaseController.update);
//eliminar una enfermedad
DiseaseRouter.delete("/:idDisease", DiseaseController.delete);
//Verificar si una plaga existe
DiseaseRouter.get("/checkExist/:nameDisease", DiseaseController.checkExist);
