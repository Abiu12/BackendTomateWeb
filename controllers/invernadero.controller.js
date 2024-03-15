import { InvernaderoModel } from "../models/invernadero.model.js";

export class InvernaderoController{
    static async getAll(){

    }
    static async getById(){

    }
    static async create(req,res){
        const {
            idAgricultor,
            nombre,
            tipoInvernadero,
            humedad,
            tamanio
        } = req.body
        const result = await InvernaderoModel.create({input:{idAgricultor,nombre,tipoInvernadero,humedad,tamanio}})
        res.status(201).json({ message : 'Invernadero creado'})
    }
    static async update (){}
    static async delete (){}    
}