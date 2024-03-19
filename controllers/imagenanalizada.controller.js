import { ImagenAnalizadaModel } from "../models/imagenanalizada.model.js"
import { ImagenAnalizadaPlagaModel } from "../models/imagenanalizadaplaga.model.js"
import { ImagenAnalizadaEnfermedadModel } from "../models/imagenanalizadaenfermedad.model.js"
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
        var imagenesAnalizadasPlagas = []
        var imagenesAnalizadasEnfermedades = []
        for (let index = 0; index < imagenesAnalizadas.length; index++) {
            var idImagen = imagenesAnalizadas[index].id_imagenanalizada
            var plagaImagen = await ImagenAnalizadaPlagaModel.getImagenAnalizadaPlagaByImagenAnalizada({idImagen})
            var enfermedadImagen = await ImagenAnalizadaEnfermedadModel.getImagenAnalizadaEnfermedadByImagenAnalizada({idImagen}) 
            imagenesAnalizadasPlagas.push(plagaImagen)
            imagenesAnalizadasEnfermedades.push(enfermedadImagen)
        }
        
        res.json(imagenesAnalizadas)
    }
    
}