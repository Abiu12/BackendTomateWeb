import { Router } from "express";
import { InvernaderoController } from "../controllers/invernadero.controller.js";

export const InvernaderoRouter = Router ()

//Obtener todos los invernaderos
InvernaderoRouter.get('/', InvernaderoController.getAll)
//Obtener un invernadero por id
InvernaderoRouter.get('/:id',InvernaderoController.getById)
//Crear un invernadero
InvernaderoRouter.post('/', InvernaderoController.create)
//Eliminar un invernadero
InvernaderoRouter.delete('/:id',InvernaderoController.delete)
//Obtener los invernaderos por idAgricultor
InvernaderoRouter.get('/agricultor/:idAgricultor', InvernaderoController.getInvernaderoByAgricultor)
