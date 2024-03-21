import { PlagueModel } from "../models/plague.model.js"
export class PlagueController{
    static async getAll(req,res){}
    static async getById(req,res){}
    static async create(req,res){
        const {
            name,
            nameScientific,
            recommendations,
            actions
        } = req.body
        const result = await PlagueModel.create({input:{name,nameScientific,recommendations,actions}})
        res.json({message: "Plaga registrada"})
    }
    static async update(req,res){}
    static async delete(req,res){}
  
    
}