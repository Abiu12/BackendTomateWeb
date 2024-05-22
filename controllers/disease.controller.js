import { DiseaseModel } from "../models/disease.model.js";
export class DiseaseController {
  //Ya
  static async getAll(req, res) {
    try {
      const response = await DiseaseModel.getAll();
      if (response.length > 0) {
        return res.json(response);
      }
      res.status(404).json({ message: "No se encontraron enfermedades" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Ya
  static async getById(req, res) {
    try {
      const { idDisease } = req.params;
      const response = await DiseaseModel.getById({ idDisease });
      if (!response[0]) {
        return res
          .status(404)
          .json({ message: "No se encontró la enfermedad" });
      }
      return res.json(response[0]);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  //Ya
  static async create(req, res) {
    try {
      const { name, nameScientific, recommendations, description, actions } =
        req.body;
      const response = await DiseaseModel.create({
        input: { name, nameScientific, description, recommendations, actions },
      });
      if (response[0].affectedRows == 1) {
        return res.status(201).json({ message: "Enfermedad registrada" });
      }
      return res.json({
        message:
          "Hubo un problema al registrar la enfermedad en la base de datos",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Ya
  static async update(req, res) {
    try {
      const { name, nameScientific, recommendations, actions, description } =
        req.body;
      const { idDisease } = req.params;
      const response = await DiseaseModel.update({
        input: {
          name,
          nameScientific,
          recommendations,
          actions,
          description,
          idDisease,
        },
      });
      if (response[0].affectedRows == 1) {
        return res.json({ message: "Enfermedad actualizada correctamente" });
      }
      return res.status(404).json({ message: "No se encontró la enfermedad" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Ya
  static async delete(req, res) {
    try {
      const { idDisease } = req.params;
      const response = await DiseaseModel.delete({ idDisease });
      if (response[0].affectedRows == 1)
        return res.json({ message: "La enfermedad ha sido eliminada" });
      return res.status(404).json({
        message: "No se encontró una enfermedad con ese id",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Ya
  static async checkExist(req, res) {
    try {
      const { nameDisease } = req.params;
      const response = await DiseaseModel.checkExist({ nameDisease });
      if (response[0].length > 0) {
        return res.json({ exists: true });
      }
      res.json({ exists: false });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
