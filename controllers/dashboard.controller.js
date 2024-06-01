import { DashboardModel } from "../models/dashboard.model.js";
export class DashboardController {
  //Ya
  static async getTotalPlaguesByIdGreenhouse(req, res) {
    try {
      const { idGreenhouse } = req.params;
      const response = await DashboardModel.getTotalPlaguesByIdGreenhouse({
        idGreenhouse,
      });
      if (response[0]) {
        return res.json(response[0][0].cantidad_plagas);
      }
    } catch (error) {
      res.status(500).json({ message: `Hubo un problema ${error}` });
    }
  }

  //Ya
  static async getTotalDiseasesByIdGreenhouse(req, res) {
    try {
      const { idGreenhouse } = req.params;
      const response = await DashboardModel.getTotalDiseasesByIdGreenhouse({
        idGreenhouse,
      });
      if (response[0]) {
        return res.json(response[0][0].cantidad_plagas);
      }
    } catch (error) {
      res.status(500).json({ message: `Hubo un problema ${error}` });
    }
  }
  static async getTotalImagesAnalizedByStatus(req, res) {
    try {
      const { idGreenhouse } = req.params;
      const response = await DashboardModel.getTotalImagesAnalizedByStatus({
        idGreenhouse,
      });
      if (response[0].length > 0) {
        return res.status(200).json(response[0]);
      }
      return res.status(404).json({ message: "No se encontró informacion" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
