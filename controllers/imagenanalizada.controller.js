import { ImagenAnalizadaModel } from "../models/imagenanalizada.model.js"
export class ImagenAnalizadaController{
    static async getAll(req,res){}
    static async getById(req,res){}
    static async create(req,res){
        // const {
        //     numeroCama,
        //     idInvernadero,
        //     idCultivo
        // } = req.body
        // const result = await CamaModel.create({input:{numeroCama,idInvernadero,idCultivo}})
        // res.json({message:'Cama creada'})
    }
    static async update(req,res){}
    static async delete(req,res){}
    static async getImagenAnalizadaByCama(req,res){
        const {idCama} = req.params
        const imagenesAnalizadas = await ImagenAnalizadaModel.getImagenAnalizadaByCama({idCama})
        res.json(imagenesAnalizadas)
    }
    
}