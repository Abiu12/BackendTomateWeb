import { Router } from "express";
import { ReportController } from "../controllers/report.controller.js";
export const ReportRouter = Router ()

//Obtener el total de imagenes analizadas de un invernadero de un agricultor
ReportRouter.get('/getnumberanalizedimages/:idFarmer/:idGreenhouse', ReportController.getAnalizedImagesByFarmerByGreenhouse)
//Obtener el cultivo mas atacado de un invernadero de un agricultor
ReportRouter.get('/getmostatackedcrop/:idFarmer/:idGreenhouse',ReportController.getMostAtackedCropByFarmerByGreenhouse)
//Obtener las enfermedades por agricultor de invernadero
ReportRouter.get('/getdiseases/:idFarmer/:idGreenhouse',ReportController.getDiseasesByFarmerByGreenhouse)
//Obtener las plagas por agricultor de invernadero
ReportRouter.get('/getplagues/:idFarmer/:idGreenhouse',ReportController.getPlaguesByFarmerByGreenhouse)
