import { DiseaseModel } from "../models/disease.model.js"
export class DiseaseController{
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
    
    static async create(req, res) {
        try {
            const { name, nameScientific, recommendations, actions } = req.body;
            const result = await DiseaseModel.create({ input: { name, nameScientific, description, recommendations, actions } });
            res.json({ message: "Enfermedad registrada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}