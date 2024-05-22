import { PlagueModel } from "../models/plague.model.js";
export class PlagueController {
  // ya
  static async getAll(req, res) {
    try {
      const response = await PlagueModel.getAll();
      if (response.length > 0) {
        return res.json(response);
      }
      return res.json({ message: "No se encontraron plagas" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // ya
  static async getById(req, res) {
    try {
      const { idPlague } = req.params;
      const response = await PlagueModel.getById({ idPlague });
      if (response.length == 0) {
        return res.status(404).json({ message: "No se encontró la plaga" });
      }
      return res.json(response[0]);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  //ya
  static async create(req, res) {
    try {
      const { name, nameScientific, recommendations, actions, description } =
        req.body;
      const response = await PlagueModel.create({
        input: { name, nameScientific, recommendations, actions, description },
      });
      if (response[0].affectedRows == 1) {
        return res.status(201).json({ message: "Plaga registrada" });
      }
      return res.json({ message: "Hubo un problema al registrar la plaga" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //ya
  static async update(req, res) {
    try {
      const { name, nameScientific, recommendations, actions, description } =
        req.body;
      const { idPlague } = req.params;
      const response = await PlagueModel.update({
        input: {
          name,
          nameScientific,
          recommendations,
          actions,
          description,
          idPlague,
        },
      });
      if (response[0].affectedRows == 1) {
        return res.json({ message: "Plaga actualizada correctamente" });
      }
      return res.status(404).json({ message: "No se encuentra la plaga" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // ya
  static async delete(req, res) {
    try {
      const { idPlague } = req.params;
      const response = await PlagueModel.delete({ idPlague });
      if (response[0].affectedRows == 1)
        return res.json({ message: "La plaga ha sido eliminada" });
      return res.status(404).json({ message: "No hay una plaga con ese id" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //ya
  static async checkExist(req, res) {
    const { namePlague } = req.params;
    const response = await PlagueModel.checkExist({ namePlague });
    if (response.length > 0) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  }
}
