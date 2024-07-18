import { Router } from "express";
import { PlagueController } from "../controllers/plague.controller.js";
export const PlagueRouter = Router();
//obtener todas las plagas
PlagueRouter.get("/", PlagueController.getAll);
//Obtener una plaga por id
PlagueRouter.get("/:idPlague", PlagueController.getById);
//crear  una plaga
PlagueRouter.post("/", PlagueController.create);
//actualizar
PlagueRouter.patch("/:idPlague", PlagueController.update);
//eliminar una plaga
PlagueRouter.delete("/:idPlague", PlagueController.delete);
//Verificar si una plaga existe
PlagueRouter.get("/checkExist/:namePlague", PlagueController.checkExist);
