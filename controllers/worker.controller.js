import { WorkerModel } from "../models/worker.model.js";
import { PersonModel } from "../models/person.model.js"
import { UserModel } from "../models/user.model.js"
import { WorkerGreenhouseModel } from "../models/workergreenhouse.js";

export class WorkerController {
    static async getAll(req,res){
        const workers = await WorkerModel.getAll()
        // var resultWorkers = []
        // for (let index = 0; index < idWorkers.length; index++) {
        //     var id = idWorkers[index].id_persona
        //     var infoWorker = await PersonModel.getById({id})
        //     resultWorkers.push(infoWorker)
        // }
        res.json(workers)    
    }
    static async getById(req,res){
        const {id} = req.params
        const idPerson = await WorkerModel.getById({id})
        const worker = await PersonModel.getById({id: idPerson.id_persona})
        if(worker) return res.json(worker)
        return res.status(404).json({message: "Trabajador no encontrado"})
    }
    static async create(req, res) {
        const {
            name,
            surname,
            secondSurname,
            phone,
            email,
            nameUser,
            password,
            role} = req.body
        const{idFarmer} = req.params
        const idPerson = await PersonModel.create({input: {name,surname,secondSurname,phone,email}})
        await WorkerModel.create({input : {idFarmer,idPerson}})
        await UserModel.create({input: {nameUser,password,idPerson,role}})
        res.status(201).json({ message : 'Trabajador creado'})
    }
    static async delete(req,res){
        // const {id} = req.params
        // const agricultor = await TrabajadorModel.getById({id})
        // const idPersona = agricultor.id_persona
        // await TrabajadorModel.delete({id:id})    
        // await PersonaModel.delete({id:idPersona})
        // return res.json({message: 'Trabajador eliminado'})
    }
    static async update(req,res){
        const{
            idWorker
        } = req.params
        const{
            idFarmer,
            name,
            surname,
            secondSurname,
            phone,
            email,
            nameUser,
            password,
            role
        } = req.body
        const worker = await WorkerModel.getById({idWorker})
        const idPerson = worker.id_persona
        await WorkerModel.update({input:{idWorker:worker.id_trabajador,idFarmer}})
        await PersonModel.update({input:{idPerson,name,surname,secondSurname,phone,email}})
        await UserModel.update({input:{idPerson,nameUser,password,role}})
        res.json({message: "Se han actualizado los datos del agricultor"})
    }
    static async assignGreenhouse(req,res){
        const {
            idWorker
        } = req.params
        const{
            idGreenhouse
        } = req.body
        await WorkerGreenhouseModel.create({input:{idWorker,idGreenhouse}})
        res.json({message: "Invernadero asociado a trabajador"})
    }
    static async getGreenhousesByIdWorker(req,res){
        const {idWorker} = req.params
        const greenhouses = await WorkerGreenhouseModel.getGreenhousesByIdWorker({idWorker})
        // var greenhouses = []
        // for(const idGreenhouse of idGreenhouses ){
        //     var greenhouse = await GreenhouseModel.getById({idGreenhouse:idGreenhouse.id_invernadero})
        //     greenhouses.push(greenhouse[0])
        // }
        return res.json(greenhouses)
    }
}