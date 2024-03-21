import { Router } from "express";
import { GreenhouseController } from "../controllers/greenhouse.controller.js";

export const GreenhouseRouter = Router ()

//Obtener todos los invernaderos
GreenhouseRouter.get('/', GreenhouseController.getAll)
//Obtener un invernadero por id
GreenhouseRouter.get('/:id',GreenhouseController.getById)
//Crear un invernadero
GreenhouseRouter.post('/', GreenhouseController.create)
//Eliminar un invernadero
GreenhouseRouter.delete('/:id',GreenhouseController.delete)
//Obtener los invernaderos por idAgricultor
GreenhouseRouter.get('/farmer/:idFarmer', GreenhouseController.getGreenhouseByFarmer)
