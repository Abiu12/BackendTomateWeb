import { AnalizedImageModel } from "../models/analyzedimage.model.js";
import { AnalizedImagePlagueModel } from "../models/analizedimageplague.model.js";
import { AnalyzedImageDiseaseModel } from "../models/analizedimagedisease.model.js";
import { PlagueModel } from "../models/plague.model.js";
import { DiseaseModel } from "../models/disease.model.js";
export class AnlizedImageController {
  static async getAnalizedImageByBed(req, res) {
    try {
      const { idBed } = req.params;
      const analizedImages = await AnalizedImageModel.getAnalizedImageByBed({
        idBed,
      });
      if (analizedImages.length == 0) {
        return res.json({ message: "No existe la cama" });
      }
      const results = [];
      for (const image of analizedImages) {
        const idPlagues =
          await AnalizedImagePlagueModel.getAnalizedImagePlagueByIdAnalizedImage(
            { idAnalizedImage: image.id_imagenanalizada }
          );
        const idDiseases =
          await AnalyzedImageDiseaseModel.getAnalizedImageDiseaseByIdAnalizedImage(
            { idAnalizedImage: image.id_imagenanalizada }
          );
        if (idPlagues.length == 0 && idDiseases == 0) {
          return res.json({
            message: "No hay plagas y enfermedades asociadas a la imagen",
          });
        }
        var namesPlagues = [];
        var namesDiseases = [];
        for (const plague of idPlagues) {
          const namePlaga = await PlagueModel.getById({
            idPlague: plague.id_plaga,
          });
          if (namePlaga) {
            namesPlagues.push(namePlaga.nombre);
          } else {
            return res.json({
              message: "No se encontró un nombre de plaga registrado a ese id",
            });
          }
        }
        for (const disease of idDiseases) {
          const nameDisease = await DiseaseModel.getById({
            idDisease: disease.id_enfermedad,
          });
          if (nameDisease) {
            namesDiseases.push(nameDisease.nombre);
          } else {
            return res.json({
              message:
                "No se encontró un nombre de enfermedad registrado a ese id",
            });
          }
        }
        const informationImage = {
          id_analizedImage: image.id_imagenanalizada,
          detected: {
            plagues: namesPlagues,
            diseases: namesDiseases,
          },
          date: image.fecha,
          image: image.imagen,
          status: image.estado,
        };
        results.push(informationImage);
      }
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: `Hubo un problema ${error}` });
    }
  }
  static async getRecomendationsAndActionsByIdAnalizedImage(req, res) {
    const { idAnalizedImage } = req.params;
    //Obtener recomendaciones y acciones para lo detectado en la imagen
    const recomendationsAndActions =
      await AnalizedImageModel.getRecomendationsAndActionsByIdAnalizedImage({
        idAnalizedImage,
      });
    res.json(recomendationsAndActions);
  }
  static async updateStatusAnalizedImage(req, res) {
    const { idAnalizedImage } = req.params;
    const { status } = req.body;
    await AnalizedImageModel.updateStatusAnalizedImage({
      input: { idAnalizedImage, status },
    });
    res.json({ message: "Estado actualizado" });
  }
}
