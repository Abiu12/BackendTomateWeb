import { Router } from "express";
import { ImagenAnalizadaController } from "../controllers/imagenanalizada.controller.js";

export const ImagenAnalizadaRouter = Router ()

//obtener todas las imagen analizadas
ImagenAnalizadaRouter.get('/', ImagenAnalizadaController.getAll)
//obtener una imagen analizada por id
ImagenAnalizadaRouter.get('/:id',ImagenAnalizadaController.getById)
//crear una imagen analizada
ImagenAnalizadaRouter.post('/', ImagenAnalizadaController.create)
//eliminar una imagen analizada
ImagenAnalizadaRouter.delete('/:id',ImagenAnalizadaController.delete)
//obtener las imagen analizadas de una cama
ImagenAnalizadaRouter.get('/invernadero/cama/:idCama',ImagenAnalizadaController.getImagenAnalizadaByCama)