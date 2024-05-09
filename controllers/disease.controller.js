import { DiseaseModel } from "../models/disease.model.js";
export class DiseaseController {
  static async getAll(req, res) {
    try {
      const result = await DiseaseModel.getAll();
      if (result.length > 0) {
        return res.json(result);
      }
      res.status(404).json({ message: "No se encontraron enfermedades" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getById(req, res) {
    try {
      const { idDisease } = req.params;
      const response = await DiseaseModel.getById({ idDisease });
      if (!response) {
        return res.json({ message: "No se encontró la enfermedad" });
      }
      return res.json(response);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async create(req, res) {
    try {
      const { name, nameScientific, recommendations, description, actions } =
        req.body;
      const result = await DiseaseModel.create({
        input: { name, nameScientific, description, recommendations, actions },
      });
      res.json({ message: "Enfermedad registrada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async update(req, res) {
    try {
      const { name, nameScientific, recommendations, description, actions } =
        req.body;
      const { idDisease } = req.params;
      const result = await DiseaseModel.update({
        input: {
          name,
          nameScientific,
          recommendations,
          description,
          actions,
          idDisease,
        },
      });
      if (result)
        return res.json({ message: "Enfermedad actualizada correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async delete(req, res) {
    try {
      const { idDisease } = req.params;
      const response = await DiseaseModel.delete({ idDisease });
      if (response)
        return res.json({ message: "La enfermedad ha sido eliminada" });
      return res.json({
        message: "Hubo un problema al eliminar la enfermedad",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async checkExist(req, res) {
    const { nameDisease } = req.params;
    const response = await DiseaseModel.checkExist({ nameDisease });
    if (response[0].length > 0) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  }
}
