import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
export const AdminRouter = Router();

// Obtener los datos del admin
AdminRouter.get("/", AdminController.getData);
//Actualizar los datos del admin
AdminRouter.patch("/", AdminController.update);
