import { Router } from "express";
import { CamaController } from "../controllers/cama.controller.js";

export const CamaRouter = Router ()

//obtener todas las camas
CamaRouter.get('/', CamaController.getAll)
//obtener una cama por id
CamaRouter.get('/:id',CamaController.getById)
//crear una cama
CamaRouter.post('/', CamaController.create)
//eliminar una cama
CamaRouter.delete('/:id',CamaController.delete)
//obtener las camas de un invernadero
CamaRouter.get('/invernadero/:idInvernadero',CamaController.getCamaByInvernadero)