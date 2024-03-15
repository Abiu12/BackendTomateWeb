import { TrabajadorInvernaderoModel } from "../models/trabajadorinvernadero.model.js";

export class TrabajadorInvernaderoController{
    static async getAll(){

    }
    static async getById(){

    }
    static async create(req,res){
        const{
            idTrabajador,
            idInvernadero
        } = req.body
        await TrabajadorInvernaderoModel.create({input:{idTrabajador,idInvernadero}})
        res.json({message: "Invernadero asociado a trabajador"})
    }
    static async update(){

    }
    static async delete(){
        
    }
    
}