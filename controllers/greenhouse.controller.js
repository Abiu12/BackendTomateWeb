import { GreenhouseModel } from "../models/greenhouse.model.js";

export class GreenhouseController{
    static async getAll(req, res){
        const resultGreenhouses = await GreenhouseModel.getAll()
        return res.json(resultGreenhouses)
    }
    static async getById(){

    }
    static async create(req,res){
        const {
            idFarmer,
            name,
            typeGreenhouse,
            humidity,
            size
        } = req.body
        const result = await GreenhouseModel.create({input:{idFarmer,name,typeGreenhouse,humidity,size}})
        res.status(201).json({ message : 'Invernadero creado'})
    }
    static async update (req,res){
        const {idGreenhouse} = req.params
        const {
            idFarmer,
            name,
            typeGreenhouse,
            humidity,
            size
        } = req.body
        const result = await GreenhouseModel.update({input:{idGreenhouse,idFarmer,name,typeGreenhouse,humidity,size}})
        res.json({message:"Invernadero actualizado"})
    }
    static async delete (){}  
    static async getGreenhouseByFarmer(req,res){
        const {idFarmer} = req.params
        const greenhouses = await GreenhouseModel.getGreenhouseByIdFarmer({idFarmer})
        res.json(greenhouses) 
    }  
}