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

  // static async getAnalizedImagesByFarmerByGreenhouse(req, res) {
  //   try {
  //     const { idFarmer, idGreenhouse } = req.params;
  //     const result =
  //       await DashboardModel.getTotalAnalizedImagesByFarmerByGreenhouse({
  //         input: { idFarmer, idGreenhouse },
  //       });
  //     return res.json(result);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  // static async getMostAtackedCropByFarmerByGreenhouse(req, res) {
  //   try {
  //     const { idFarmer, idGreenhouse } = req.params;
  //     const result =
  //       await DashboardModel.getMostAtackedCropByFarmerByGreenhouse({
  //         input: { idFarmer, idGreenhouse },
  //       });
  //     return res.json(result);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  // static async getDiseasesByFarmerByGreenhouse(req, res) {
  //   try {
  //     const { idFarmer, idGreenhouse } = req.params;
  //     const result = await DashboardModel.getDiseasesByFarmerByGreenhouse({
  //       input: { idFarmer, idGreenhouse },
  //     });
  //     return res.json(result);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  // static async getPlaguesByFarmerByGreenhouse(req, res) {
  //   try {
  //     const { idFarmer, idGreenhouse } = req.params;
  //     const result = await DashboardModel.getPlaguesByFarmerByGreenhouse({
  //       input: { idFarmer, idGreenhouse },
  //     });
  //     return res.json(result);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
}
