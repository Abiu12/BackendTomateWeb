import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
export const AdminRouter = Router();
AdminRouter.get("/", AdminController.getData);
AdminRouter.patch("/", AdminController.update);
AdminRouter.patch("/changePassword", AdminController.changePassword);
AdminRouter.patch("/updateFarmer/:idFarmer", AdminController.updateFarmer);
AdminRouter.patch("/updateWorker/:idWorker", AdminController.updateWorker);
