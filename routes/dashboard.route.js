import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller.js";
export const DashboardRouter = Router();
DashboardRouter.get(
  "/getTotalPlaguesByIdGreenhouse/:idGreenhouse",
  DashboardController.getTotalPlaguesByIdGreenhouse
);
DashboardRouter.get(
  "/getTotalDiseasesByIdGreenhouse/:idGreenhouse",
  DashboardController.getTotalDiseasesByIdGreenhouse
);
DashboardRouter.get(
  "/getTotalImagesAnalizedByStatus/:idGreenhouse",
  DashboardController.getTotalImagesAnalizedByStatus
);
DashboardRouter.get(
  "/getCountPlagues/:idGreenhouse",
  DashboardController.getCountPlagues
);
DashboardRouter.get(
  "/getCountDiseases/:idGreenhouse",
  DashboardController.getCountDiseases
);
DashboardRouter.get(
  "/totalPlaguesDiseases/:idGreenhouse",
  DashboardController.totalPlaguesDiseases
);
DashboardRouter.post(
  "/getTotalPlaguesDiseasesDetectedByDate/:idGreenhouse",
  DashboardController.totalPlaguesDiseasesByDate
);
