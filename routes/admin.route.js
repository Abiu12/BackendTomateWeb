import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
export const AdminRouter = Router();

// Obtener los datos del admin
AdminRouter.get("/", AdminController.getData);
//Actualizar los datos del admin
AdminRouter.patch("/", AdminController.update);

//Cambiar la contraseña
AdminRouter.patch("/changePassword", AdminController.changePassword);

//Actualizar agricultor
AdminRouter.patch("/updateFarmer/:idFarmer", AdminController.updateFarmer);

//Actualizar trabajador
AdminRouter.patch("/updateWorker/:idWorker", AdminController.updateWorker);
