import { Router } from "express";
import { AnalizeImageController } from "../controllers/analizeimage.controller.js";

export const AnalizeImageRouter = Router ()

AnalizeImageRouter.get('/:image',AnalizeImageController.detected)