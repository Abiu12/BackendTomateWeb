import { DiseaseModel } from "../models/disease.model.js"
export class DiseaseController{
    static async getAll(req,res){}
    static async getById(req,res){}
    static async create(req,res){
        const {
            numberBed,
            idGreenhouse,
            
        } = req.body
        res.json({message:'Cama creada'})
    }
    static async update(req,res){}
    static async delete(req,res){}
    
    
}