import { BedModel } from "../models/bed.model.js";
export class BedController {
  //Ya
  static async create(req, res) {
    try {
      const { numberBed, typeCrop, idGreenhouse } = req.body;
      const response = await BedModel.create({
        input: { numberBed, typeCrop, idGreenhouse },
      });
      if (response[0].affectedRows == 1) {
        return res.status(201).json({ message: "La cama fué creada" });
      }
      return res.json({
        message: "Hubo un problema al crear la cama en la base de datos",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Ya
  static async getById(req, res) {
    try {
      const { idBed } = req.params;
      const response = await BedModel.getById({ idBed });
      if (response.length > 0) {
        return res.json(response);
      }
      return res.json({ message: "Cama no encontrada" });
    } catch (error) {
      res.status(500).json({ message: `Hubo un error ${error}` });
    }
  }
  static async delete(req, res) {
    try {
      const { idBed } = req.params;
      const response = await BedModel.delete({ idBed });
      if (response[0].affectedRows == 1) {
        return res.status(200).json({ message: "La cama ha sido eliminada" });
      }
      return res.status(404).json({ message: "No se ha encontrado la cama" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Ya
  static async update(req, res) {
    try {
      const { idBed } = req.params;
      const { numberBed, typeCrop, idGreenhouse } = req.body;
      const response = await BedModel.update({
        input: { idBed, numberBed, typeCrop, idGreenhouse },
      });
      if (response[0].affectedRows == 1) {
        return res.json({ message: "Cama actualizada" });
      }
      return res.json({ message: "No se encontro la cama" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Ya
  static async getBedByGreenhouse(req, res) {
    try {
      const { idGreenhouse } = req.params;
      const response = await BedModel.getBedByGreenhouse({ idGreenhouse });
      if (response.length > 0) {
        return res.status(200).json(response);
      }
      return res
        .status(404)
        .json({ message: "El invernadero no tiene registradas camas" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
