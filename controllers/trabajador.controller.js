import { TrabajadorModel } from "../models/trabajador.model.js";
import { PersonaModel } from "../models/persona.model.js"
import { UsuarioModel } from "../models/usuario.model.js"
export class TrabajadorController {
    static async getAll(req,res){
        const idTrabajadores = await TrabajadorModel.getAll()
        var resultTrabajadores = []
        for (let index = 0; index < idTrabajadores.length; index++) {
            var id = idTrabajadores[index].id_persona
            var infoTrabajador = await PersonaModel.getById({id})
            resultTrabajadores.push(infoTrabajador)
        }
        res.json(resultTrabajadores)    
    }
    static async getById(req,res){
        const {id} = req.params
        const idPersona = await TrabajadorModel.getById({id})
        const trabajador = await PersonaModel.getById({id: idPersona.id_persona})
        if(trabajador) return res.json(trabajador)
        return res.status(404).json({message: "Trabajador no encontrado"})
    }
    static async create(req, res) {
        const {
            idAgricultor,
            nombre,
            primerApellido,
            segundoApellido,
            telefono,
            correoElectronico,
            nombreUsuario,
            contrasenia,
            rol} = req.body
        
        const idPersona = await PersonaModel.create({input: {nombre,primerApellido,segundoApellido,telefono,correoElectronico}})
        await TrabajadorModel.create({input : {idAgricultor,idPersona}})
        await UsuarioModel.create({input: {nombreUsuario,contrasenia,idPersona,rol}})
        res.status(201).json({ message : 'Trabajador creado'})
    }
    static async delete(req,res){
        const {id} = req.params
        const agricultor = await TrabajadorModel.getById({id})
        const idPersona = agricultor.id_persona
        await TrabajadorModel.delete({id:id})    
        await PersonaModel.delete({id:idPersona})
        // if(result === false){
        //     return res.status(404).json({ message: 'Agricultor no encontrado'})
        // }
        return res.json({message: 'Trabajador eliminado'})
    }
}