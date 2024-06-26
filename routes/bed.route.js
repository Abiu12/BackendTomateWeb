import { Router } from "express";
import { BedController } from "../controllers/bed.controller.js";

export const BedRouter = Router();

//obtener todas las camas
// BedRouter.get('/', BedController.getAll)
//obtener una cama por id
BedRouter.get("/:idBed", BedController.getById);
//crear una cama
BedRouter.post("/", BedController.create);
//eliminar una cama
BedRouter.delete("/:idBed", BedController.delete);
//Actualizar una cama
BedRouter.patch("/:idBed", BedController.update);
//obtener las camas de un invernadero
BedRouter.get("/greenhouse/:idGreenhouse", BedController.getBedByGreenhouse);
