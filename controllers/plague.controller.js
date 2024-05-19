import { PlagueModel } from "../models/plague.model.js";
export class PlagueController {
  static async getAll(req, res) {
    try {
      const result = await PlagueModel.getAll();
      if (result) {
        return res.json(result);
      }
      res.json({ message: "No se encontraron plagas" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getById(req, res) {
    try {
      const { idPlague } = req.params;
      const response = await PlagueModel.getById({ idPlague });
      if (!response) {
        return res.json({ message: "No se encontró la plaga" });
      }
      return res.json(response);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
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
  static async update(req, res) {
    try {
      const { name, nameScientific, recommendations, actions, description } =
        req.body;
      const { idPlague } = req.params;
      const result = await PlagueModel.update({
        input: {
          name,
          nameScientific,
          recommendations,
          actions,
          description,
          idPlague,
        },
      });
      if (result)
        return res.json({ message: "Plaga actualizada correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async delete(req, res) {
    try {
      const { idPlague } = req.params;
      const response = await PlagueModel.delete({ idPlague });
      if (response) return res.json({ message: "La plaga ha sido eliminada" });
      return res.json({ message: "Hubo un problema al eliminar la plaga" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async checkExist(req, res) {
    const { namePlague } = req.params;
    const response = await PlagueModel.checkExist({ namePlague });
    if (response[0].length > 0) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  }
}
