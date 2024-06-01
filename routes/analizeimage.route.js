import { Router } from "express";
import { AnalizeImageController } from "../controllers/analizeimage.controller.js";

export const AnalizeImageRouter = Router();

AnalizeImageRouter.post("/:idBed/:idUser", AnalizeImageController.detected);

AnalizeImageRouter.post("/web/:idBed", AnalizeImageController.detectedWeb);

AnalizeImageRouter.post(
  "/:tokenNotification",
  AnalizeImageController.detectedGuest
);
