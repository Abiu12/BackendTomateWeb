import { Router } from "express";
import { AnalizeImageController } from "../controllers/analizeimage.controller.js";

export const AnalizeImageRouter = Router ()

AnalizeImageRouter.post('/:idBed',AnalizeImageController.detected)