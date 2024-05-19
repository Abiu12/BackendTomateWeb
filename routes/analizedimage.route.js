import { Router } from "express";
import { AnlizedImageController } from "../controllers/analizedImage.controller.js";

export const AnalizedImageRouter = Router();

//Obtener los datos de una imagen analizada de invitado
AnalizedImageRouter.post(
  "/solutionsGuests",
  AnlizedImageController.getRecomendationsAndActionsByGuests
);
//obtener las imagen analizadas de una cama
AnalizedImageRouter.get(
  "/greenhouse/bed/:idBed",
  AnlizedImageController.getAnalizedImageByBed
);
//Obtener recomendaciones y acciones de las enfermedades
AnalizedImageRouter.get(
  "/solutions/:idAnalizedImage",
  AnlizedImageController.getRecomendationsAndActionsByIdAnalizedImage
);
//Para cambiar el estado de la imagen analizada
AnalizedImageRouter.patch(
  "/:idAnalizedImage",
  AnlizedImageController.updateStatusAnalizedImage
);
