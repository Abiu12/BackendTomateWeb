import { BedModel } from "../models/bed.model.js";
export class BedController{
    static async getAll(req,res){}
    static async getById(req,res){}
    static async create(req, res) {
        try {
            const { numberBed, typeCrop, idGreenhouse } = req.body;
            const result = await BedModel.create({ input: { numberBed, typeCrop, idGreenhouse } });
            res.json({ message: 'Cama creada' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async update(req,res){
        const {idBed} =  req.params
        const {
            numberBed,
            typeCrop,
            idGreenhouse
        } = req.body
        await BedModel.update({input:{idBed,numberBed,typeCrop,idGreenhouse}})
        res.json({message: "Cama actualizada"})
    }
    static async delete(req,res){}
    static async getBedByGreenhouse(req,res){
        const {idGreenhouse} = req.params
        const beds = await BedModel.getBedByGreenhouse({idGreenhouse})
        res.json(beds)
    }
    
}