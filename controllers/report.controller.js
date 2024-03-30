import { ReportModel } from "../models/report.model.js";
export class ReportController{
    static async getAnalizedImagesByFarmerByGreenhouse(req,res){
        const {idFarmer,idGreenhouse} = req.params
        const result = await ReportModel.getTotalAnalizedImagesByFarmerByGreenhouse({input:{idFarmer,idGreenhouse}})
        return res.json(result)
    }
    static async getMostAtackedCropByFarmerByGreenhouse(req,res){
        const {idFarmer,idGreenhouse} = req.params
        const result = await ReportModel.getMostAtackedCropByFarmerByGreenhouse({input:{idFarmer,idGreenhouse}})
        return res.json(result)
    }
    static async getDiseasesByFarmerByGreenhouse(req,res){
        const {idFarmer,idGreenhouse} = req.params
        const result = await ReportModel.getDiseasesByFarmerByGreenhouse({input:{idFarmer,idGreenhouse}})
        return res.json(result)
    }
    static async getPlaguesByFarmerByGreenhouse(req,res){
        const {idFarmer,idGreenhouse} = req.params
        const result = await ReportModel.getPlaguesByFarmerByGreenhouse({input:{idFarmer,idGreenhouse}})
        return res.json(result)
    }
    
    
}