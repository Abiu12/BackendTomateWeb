import { Router } from "express";
import { BedController } from "../controllers/bed.controller.js";
export const BedRouter = Router();
BedRouter.get("/:idBed", BedController.getById);
BedRouter.post("/", BedController.create);
BedRouter.delete("/:idBed", BedController.delete);
BedRouter.patch("/:idBed", BedController.update);
BedRouter.get("/greenhouse/:idGreenhouse", BedController.getBedByGreenhouse);
