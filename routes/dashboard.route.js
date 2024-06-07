import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller.js";
export const DashboardRouter = Router();

// Obtener por medio del id_invernadero de un invernadero el total de plagas que ha tenido
DashboardRouter.get(
  "/getTotalPlaguesByIdGreenhouse/:idGreenhouse",
  DashboardController.getTotalPlaguesByIdGreenhouse
);

// Obtener por medio del id_invernadero de un invernadero el total de enfermedades que ha tenido
DashboardRouter.get(
  "/getTotalDiseasesByIdGreenhouse/:idGreenhouse",
  DashboardController.getTotalDiseasesByIdGreenhouse
);

// De un invernadero dado su ID_INVERNADERO traer la cantidad de estados de sus imagenes analizadas
DashboardRouter.get(
  "/getTotalImagesAnalizedByStatus/:idGreenhouse",
  DashboardController.getTotalImagesAnalizedByStatus
);

//De un invernadero dado su ID_INVERNADERO traer la cantidad de cada una de las plagas
DashboardRouter.get(
  "/getCountPlagues/:idGreenhouse",
  DashboardController.getCountPlagues
);
//De un invernadero dado su ID_INVERNADERO traer la cantidad de cada una de las enfermedades
DashboardRouter.get(
  "/getCountDiseases/:idGreenhouse",
  DashboardController.getCountDiseases
);

//Cantidad de plagas y enfermedades, ultimo de migue
DashboardRouter.get(
  "/totalPlaguesDiseases/:idGreenhouse",
  DashboardController.totalPlaguesDiseases
);

// cantidad de plagas y enfermedades detectadas dado un ID INVERNADERO pero ahora con una fecha especifica
DashboardRouter.get(
  "/getTotalPlaguesDiseasesDetectedByDate/:idGreenhouse/",
  DashboardController.totalPlaguesDiseasesByDate
);
