import { DiseaseModel } from "../models/disease.model.js"
export class DiseaseController{
    static async getAll(req,res){}
    static async getById(req,res){}
    static async create(req,res){
        const {
            name,
            nameScientific,
            recommendations,
            actions
        } = req.body
        const result = await DiseaseModel.create({input:{name,nameScientific,recommendations,actions}})
        res.json({message: "Enfermedad registrada"})
    }
    static async update(req,res){}
    static async delete(req,res){}
    
    
}