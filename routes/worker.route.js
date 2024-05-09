import { Router } from "express";
import { WorkerController } from "../controllers/worker.controller.js";

export const WorkerRouter = Router();

WorkerRouter.get("/", WorkerController.getAll);
WorkerRouter.get("/:idWorker", WorkerController.getById);
WorkerRouter.get(
  "/getgreenhouses/:idWorker",
  WorkerController.getGreenhousesByIdWorker
);
WorkerRouter.post("/:idFarmer", WorkerController.create);
WorkerRouter.delete("/:idWorker", WorkerController.delete);
WorkerRouter.patch("/:idWorker", WorkerController.update);
WorkerRouter.post(
  "/asigngreenhouse/:idWorker",
  WorkerController.assignGreenhouse
);
//Cambiar contraseña de trabajador
WorkerRouter.patch(
  "/changepassword/:idWorker",
  WorkerController.changePassword
);
