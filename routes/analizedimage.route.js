import { Router } from "express";
import { AnlizedImageController } from "../controllers/analizedImage.controller.js";

export const AnalizedImageRouter = Router ()

// //obtener todas las imagen analizadas
// AnalizedImageRouter.get('/', AnlizedImageController.getAll)
// //obtener una imagen analizada por id
// AnalizedImageRouter.get('/:id',AnlizedImageController.getById)
// // //crear una imagen analizada
// // AnalizedImageRouter.post('/', AnlizedImageController.create)
// //eliminar una imagen analizada
// AnalizedImageRouter.delete('/:id',AnlizedImageController.delete)
//obtener las imagen analizadas de una cama
AnalizedImageRouter.get('/greenhouse/bed/:idBed',AnlizedImageController.getAnalizedImageByBed)
//Obtener recomendaciones y acciones de las enfermedades
AnalizedImageRouter.get('/solutions/:idAnalizedImage',AnlizedImageController.getRecomendationsAndActionsByIdAnalizedImage)
//Para cambiar el estado de la imagen analizada
AnalizedImageRouter.patch('/:idAnalizedImage',AnlizedImageController.updateStatusAnalizedImage)