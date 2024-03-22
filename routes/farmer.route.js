import { Router } from "express";
import { FarmerController } from "../controllers/farmer.controller.js";

export const FarmerRouter = Router ()

//obtener todos los agricultores
FarmerRouter.get('/', FarmerController.getAll)
//obtener un agricultor por id
FarmerRouter.get('/:id',FarmerController.getById)
//crear agricultor
FarmerRouter.post('/', FarmerController.create)
//eliminar agricultor
FarmerRouter.delete('/:id',FarmerController.delete)
//actualizar datos del agricultor
FarmerRouter.patch('/:idFarmer',FarmerController.update)
//obtener los trabajadores de un agricultor
FarmerRouter.get('/getworkers/:idFarmer',FarmerController.getWorkersByIdFarmer)