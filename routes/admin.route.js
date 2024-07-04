import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
export const AdminRouter = Router();

// Obtener los datos del admin
AdminRouter.get("/", AdminController.getData);
//Actualizar los datos del admin
AdminRouter.patch("/", AdminController.update);

//Cambiar la contraseña
AdminRouter.patch("/changePassword", AdminController.changePassword);

//Cambiar la contraseña agricultor
AdminRouter.patch(
  "/changePasswordFarmer/:idFarmer",
  AdminController.updateFarmer
);

//Cambiar la contraseña trabajador
AdminRouter.patch(
  "/changePasswordWorker/:idWorker",
  AdminController.updateWorker
);
