import { ReportModel } from "../models/report.model.js";
export class ReportController{
    static async getAnalizedImagesByFarmerByGreenhouse(req, res){
        try {
            const { idFarmer, idGreenhouse } = req.params;
            const result = await ReportModel.getTotalAnalizedImagesByFarmerByGreenhouse({ input: { idFarmer, idGreenhouse } });
            return res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async getMostAtackedCropByFarmerByGreenhouse(req, res){
        try {
            const { idFarmer, idGreenhouse } = req.params;
            const result = await ReportModel.getMostAtackedCropByFarmerByGreenhouse({ input: { idFarmer, idGreenhouse } });
            return res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async getDiseasesByFarmerByGreenhouse(req, res){
        try {
            const { idFarmer, idGreenhouse } = req.params;
            const result = await ReportModel.getDiseasesByFarmerByGreenhouse({ input: { idFarmer, idGreenhouse } });
            return res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async getPlaguesByFarmerByGreenhouse(req, res){
        try {
            const { idFarmer, idGreenhouse } = req.params;
            const result = await ReportModel.getPlaguesByFarmerByGreenhouse({ input: { idFarmer, idGreenhouse } });
            return res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    
    
}