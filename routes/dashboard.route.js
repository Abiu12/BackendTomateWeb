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

// //Obtener el total de imagenes analizadas de un invernadero de un agricultor
// DashboardRouter.get(
//   "/getnumberanalizedimages/:idFarmer/:idGreenhouse",
//   DashboardController.getAnalizedImagesByFarmerByGreenhouse
// );
// //Obtener el cultivo mas atacado de un invernadero de un agricultor
// DashboardRouter.get(
//   "/getmostatackedcrop/:idFarmer/:idGreenhouse",
//   DashboardController.getMostAtackedCropByFarmerByGreenhouse
// );
// //Obtener las enfermedades por agricultor de invernadero
// DashboardRouter.get(
//   "/getdiseases/:idFarmer/:idGreenhouse",
//   DashboardController.getDiseasesByFarmerByGreenhouse
// );
// //Obtener las plagas por agricultor de invernadero
// DashboardRouter.get(
//   "/getplagues/:idFarmer/:idGreenhouse",
//   DashboardController.getPlaguesByFarmerByGreenhouse
// );
