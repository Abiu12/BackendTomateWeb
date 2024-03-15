import { AgricultorModel } from "../models/agricultor.model.js"
import { PersonaModel } from "../models/persona.model.js"
import { UsuarioModel } from "../models/usuario.model.js"
export class AgricultorController {
    static async getAll(req,res){
        const idAgricultores = await AgricultorModel.getAll()
        var resultAgricultores = []
        for (let index = 0; index < idAgricultores.length; index++) {
            var id = idAgricultores[index].id_persona
            var infoAgricultor = await PersonaModel.getById({id})
            resultAgricultores.push(infoAgricultor)
        }
        res.json(resultAgricultores)    
    }
    static async getById(req,res){
        const {id} = req.params
        const idPersona = await AgricultorModel.getById({id})
        const agricultor = await PersonaModel.getById({id: idPersona.id_persona})
        if(agricultor) return res.json(agricultor)
        return res.status(404).json({message: "Agricultor no encontrado"})
    }
    static async create(req, res) {
        const {
            nombre,
            primerApellido,
            segundoApellido,
            telefono,
            correoElectronico,
            nombreUsuario,
            contrasenia,
            rol} = req.body
        
        const idPersona = await PersonaModel.create({input: {nombre,primerApellido,segundoApellido,telefono,correoElectronico}})
        await AgricultorModel.create({idPersona})
        await UsuarioModel.create({input: {nombreUsuario,contrasenia,idPersona,rol}})
        res.status(201).json({ message : 'Agricultor creado'})
    }
    static async delete(req,res){
        const {id} = req.params
        const agricultor = await AgricultorModel.getById({id})
        const idPersona = agricultor.id_persona
        await AgricultorModel.delete({id:id})    
        await PersonaModel.delete({id:idPersona})
        // if(result === false){
        //     return res.status(404).json({ message: 'Agricultor no encontrado'})
        // }
        return res.json({message: 'Agricultor eliminado'})
    }
}