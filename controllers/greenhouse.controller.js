import { AnalizedImageModel } from "../models/analyzedimage.model.js";
import { BedModel } from "../models/bed.model.js";
import { GreenhouseModel } from "../models/greenhouse.model.js";

export class GreenhouseController {
  static async getAll(req, res) {
    try {
      const response = await GreenhouseModel.getAll();
      if (response.length > 0) {
        return res.json(response);
      }
      return res
        .status(404)
        .json({ message: "No hay invernaderos registrados" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getById(req, res) {
    try {
      const { idGreenhouse } = req.params;
      const response = await GreenhouseModel.getById({ idGreenhouse });
      if (response.length == 0) {
        return res.json({ message: "No hay datos de este invernadero" });
      }
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async create(req, res) {
    try {
      const { idFarmer, name, typeGreenhouse, humidity, size } = req.body;
      const response = await GreenhouseModel.create({
        input: { idFarmer, name, typeGreenhouse, humidity, size },
      });
      if (response[0].affectedRows == 1) {
        return res.status(201).json({ message: "Invernadero creado" });
      }
      return res.json({ message: "Hubo un problema " });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async update(req, res) {
    try {
      const { idGreenhouse } = req.params;
      const { idFarmer, name, typeGreenhouse, humidity, size } = req.body;
      const response = await GreenhouseModel.update({
        input: { idGreenhouse, idFarmer, name, typeGreenhouse, humidity, size },
      });
      if (response[0].affectedRows == 1) {
        return res.json({ message: "Invernadero actualizado" });
      }
      return res.json({ message: "No se ha actualizado el invernadero" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getGreenhouseByFarmer(req, res) {
    try {
      const { idFarmer } = req.params;
      const response = await GreenhouseModel.getGreenhouseByIdFarmer({
        idFarmer,
      });
      if (response.length > 0) {
        return res.json(response);
      }
      return res
        .status(404)
        .json({ message: "El agricultor no tiene invernaderos" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async checkExist(req, res) {
    const { nameGreenhouse } = req.params;
    const response = await GreenhouseModel.checkExist({ nameGreenhouse });
    if (response[0].length > 0) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  }
  static async delete(req, res) {
    try {
      const { idGreenhouse } = req.params;
      const responseGreenhouse = await GreenhouseModel.delete({ idGreenhouse });
      if (!responseGreenhouse)
        return res.status(404).json({
          message: "No existe un invernadero con ese id",
        });

      return res.json({ message: "El invernadero ha sido eliminado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
