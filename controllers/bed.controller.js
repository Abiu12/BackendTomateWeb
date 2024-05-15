import { BedModel } from "../models/bed.model.js";
export class BedController {
  static async create(req, res) {
    try {
      const { numberBed, typeCrop, idGreenhouse } = req.body;
      const result = await BedModel.create({
        input: { numberBed, typeCrop, idGreenhouse },
      });
      res.json({ message: "Cama creada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { idBed } = req.params;
      const response = await BedModel.getById({ idBed });
      if (response[0]) {
        return res.json(response[0]);
      }
      return res.json({ message: "Cama no encontrada" });
    } catch (error) {
      res.status(500).json({ message: `Hubo un error ${error}` });
    }
  }
  static async update(req, res) {
    try {
      const { idBed } = req.params;
      const { numberBed, typeCrop, idGreenhouse } = req.body;
      await BedModel.update({
        input: { idBed, numberBed, typeCrop, idGreenhouse },
      });
      res.json({ message: "Cama actualizada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBedByGreenhouse(req, res) {
    try {
      const { idGreenhouse } = req.params;
      const beds = await BedModel.getBedByGreenhouse({ idGreenhouse });
      res.json(beds);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
