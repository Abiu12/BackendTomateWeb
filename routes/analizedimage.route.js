import { Router } from "express";
import { AnlizedImageController } from "../controllers/analizedImage.controller.js";
export const AnalizedImageRouter = Router();
AnalizedImageRouter.post(
  "/solutionsGuests",
  AnlizedImageController.getRecomendationsAndActionsByGuests
);
AnalizedImageRouter.get(
  "/greenhouse/bed/:idBed",
  AnlizedImageController.getAnalizedImageByBed
);
AnalizedImageRouter.get(
  "/solutions/:idAnalizedImage",
  AnlizedImageController.getRecomendationsAndActionsByIdAnalizedImage
);
AnalizedImageRouter.patch(
  "/:idAnalizedImage",
  AnlizedImageController.updateStatusAnalizedImage
);
