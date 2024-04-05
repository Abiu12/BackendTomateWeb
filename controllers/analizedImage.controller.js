import { AnalizedImageModel } from "../models/analyzedimage.model.js"
import { AnalizedImagePlagueModel } from "../models/analizedimageplague.model.js"
import { AnalyzedImageDiseaseModel } from "../models/analizedimagedisease.model.js"
import { PlagueModel } from "../models/plague.model.js"
import { DiseaseModel } from "../models/disease.model.js"
export class AnlizedImageController {
    static async getAnalizedImageByBed(req, res) {
        const { idBed } = req.params
        //Obtener todas las imagenes analizadas asociadas a la cama
        const analizedImages = await AnalizedImageModel.getAnalizedImageByBed({ idBed })
        // Array para almacenar el resultado final
        const results = [];
        // Iterar sobre cada imagen analizada obtenida
        for (const image of analizedImages) {
            const idAnalizedImage = image.id_imagenanalizada;
            // Obtener los id plagas asociadas a la imagen analizada
            const idPlagues = await AnalizedImagePlagueModel.getAnalizedImagePlagueByIdAnalizedImage({ idAnalizedImage });
            // Obtener los id enfermedades asociadas a la imagen analizada
            const idDiseases = await AnalyzedImageDiseaseModel.getAnalizedImageDiseaseByIdAnalizedImage({ idAnalizedImage });
            var namesPlagues = []
            var namesDiseases = []

            for (const plague of idPlagues){
                const idPlague = plague.id_plaga
                const namePlaga = await PlagueModel.getById({idPlague})
                namesPlagues.push(namePlaga.nombre)
            }
            for (const disease of idDiseases){
                const idDisease = disease.id_enfermedad
                const nameDisease = await DiseaseModel.getById({idDisease})
                namesDiseases.push(nameDisease.nombre)
            }
            
            // Construir la información para esta imagen analizada
            const informationImage = {
                id_analizedImage: image.id_imagenanalizada,
                detected: {
                    plagues: namesPlagues,
                    diseases: namesDiseases
                },
                date: image.fecha,
                image: image.imagen
            };
            // Agregar la información de esta imagen analizada al array de resultados
            results.push(informationImage);
        }
        // Enviar el JSON de respuesta con los resultados
        res.json(results);
    }
    static async getRecomendationsAndActionsByIdAnalizedImage(req,res){
        const {idAnalizedImage} = req.params
        //Obtener recomendaciones y acciones para lo detectado en la imagen
        const recomendationsAndActions = await AnalizedImageModel.getRecomendationsAndActionsByIdAnalizedImage({idAnalizedImage})
        res.json(recomendationsAndActions) 
    }
    static async updateStatusAnalizedImage(req,res){
        const{idAnalizedImage} = req.params
        const{status} = req.body
        await AnalizedImageModel.updateStatusAnalizedImage({input:{idAnalizedImage,status}})
        res.json({message:"Estado actualizado"})
    }
    
}