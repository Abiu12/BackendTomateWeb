import { FarmerModel } from "../models/farmer.model.js"
import { PersonModel } from "../models/person.model.js"
import { UserModel } from "../models/user.model.js"
import { WorkerModel } from "../models/worker.model.js"
export class FarmerController {
    static async getAll(req,res){
        const idFarmers = await FarmerModel.getAll()
        var resultFarmers = []
        for (let index = 0; index < idFarmers.length; index++) {
            var id = idFarmers[index].id_persona
            var infoFarmers = await PersonModel.getById({id})
            resultFarmers.push(infoFarmers)
        }
        res.json(resultFarmers)    
    }
    static async getById(req,res){
        const {id} = req.params
        const idPerson = await FarmerModel.getById({id})
        const farmer = await PersonModel.getById({id: idPerson.id_persona})
        if(farmer) return res.json(farmer)
        return res.status(404).json({message: "Agricultor no encontrado"})
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
        
        const idPerson = await PersonModel.create({input: {name,surname,secondSurname,phone,email}})
        await FarmerModel.create({idPerson})
        await UserModel.create({input: {nameUser,password,idPerson,role}})
        res.status(201).json({ message : 'Agricultor creado'})
    }
    static async delete(req,res){
        const {id} = req.params
        const farmer = await FarmerModel.getById({id})
        const idPerson = farmer.id_persona
        await FarmerModel.delete({id:id})    
        await PersonModel.delete({id:idPerson})
        // if(result === false){
        //     return res.status(404).json({ message: 'Agricultor no encontrado'})
        // }
        return res.json({message: 'Agricultor eliminado'})
    }
    static async getWorkersByIdFarmer(req,res){
        const {idFarmer} = req.params
        const result = await WorkerModel.getWorkersByIdFarmer({idFarmer})
        res.json(result)
    }
}