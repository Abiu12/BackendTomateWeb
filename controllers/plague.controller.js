import { PlagueModel } from "../models/plague.model.js"
export class PlagueController{
    static async getAll(req, res){
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
    
    static async create(req, res){
        try {
            const {
                name,
                nameScientific,
                recommendations,
                actions
            } = req.body;
            const result = await PlagueModel.create({ input: { name, nameScientific, recommendations, actions } });
            res.json({ message: "Plaga registrada" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}