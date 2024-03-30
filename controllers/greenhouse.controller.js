import { GreenhouseModel } from "../models/greenhouse.model.js";

export class GreenhouseController{
    static async getAll(req, res){
        try {
            const resultGreenhouses = await GreenhouseModel.getAll();
            res.json(resultGreenhouses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async create(req, res){
        try {
            const {
                idFarmer,
                name,
                typeGreenhouse,
                humidity,
                size
            } = req.body;
            const result = await GreenhouseModel.create({ input: { idFarmer, name, typeGreenhouse, humidity, size } });
            res.status(201).json({ message : 'Invernadero creado'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async update(req, res){
        try {
            const { idGreenhouse } = req.params;
            const {
                idFarmer,
                name,
                typeGreenhouse,
                humidity,
                size
            } = req.body;
            const result = await GreenhouseModel.update({ input: { idGreenhouse, idFarmer, name, typeGreenhouse, humidity, size } });
            res.json({ message:"Invernadero actualizado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async getGreenhouseByFarmer(req,res){
        try {
            const {idFarmer} = req.params;
            const greenhouses = await GreenhouseModel.getGreenhouseByIdFarmer({ idFarmer });
            res.json(greenhouses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    
}