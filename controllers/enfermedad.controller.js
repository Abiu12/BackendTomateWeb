import { EnfermedadModel } from "../models/enfermedad.model.js"
export class EnfermedadController{
    static async getAll(req,res){}
    static async getById(req,res){}
    static async create(req,res){
        const {
            numeroCama,
            idInvernadero,
            idCultivo
        } = req.body
        const result = await CamaModel.create({input:{numeroCama,idInvernadero,idCultivo}})
        res.json({message:'Cama creada'})
    }
    static async update(req,res){}
    static async delete(req,res){}
    static async getCamaByInvernadero(req,res){
        const {idInvernadero} = req.params
        const camas = await CamaModel.getCamaByInvernadero({idInvernadero})
        res.json(camas)
    }
    
}