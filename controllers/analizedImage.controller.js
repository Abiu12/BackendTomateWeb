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
    try {
      const { idAnalizedImage } = req.params;
      const recomendationsAndActions =
        await AnalizedImageModel.getRecomendationsAndActionsByIdAnalizedImage({
          idAnalizedImage,
        });
      if (recomendationsAndActions.length == 0) {
        return res.json({
          message: "No se encontraron los datos de la imagen",
        });
      }
      return res.json(recomendationsAndActions);
    } catch (error) {
      res.json({ message: `Hubo un problema ${error}` });
    }
  }

  //ACA me quede
  static async updateStatusAnalizedImage(req, res) {
    const { idAnalizedImage } = req.params;
    const { status } = req.body;
    await AnalizedImageModel.updateStatusAnalizedImage({
      input: { idAnalizedImage, status },
    });
    res.json({ message: "Estado actualizado" });
  }

  static async getRecomendationsAndActionsByGuests(req, res) {
    try {
      const { detected } = req.body;
      if (detected.length > 0) {
        let response = [];
        for (const detect of detected) {
          if (detect === "Mosca blanca" || detect === "Araña roja") {
            let recomendationsActions = await PlagueModel.getByName({
              name: detect,
            });
            if (recomendationsActions) {
              response.push(recomendationsActions);
            } else {
              return res.json({
                message:
                  "No se encuentra la informacion relacionada de la plaga en la base de datos",
              });
            }
          } else if (
            detect === "Alternariosis" ||
            detect === "Botritis" ||
            detect === "Mildiu del tomate"
          ) {
            let recomendationsActions = await DiseaseModel.getByName({
              name: detect,
            });
            if (recomendationsActions) {
              response.push(recomendationsActions);
            } else {
              return res.json({
                message:
                  "No se encuentra la informacion relacionada de la enfermedad en la base de datos",
              });
            }
          }
        }
        return res.json(response);
      } else {
        return res.json({ message: "No hay nada detectado" });
      }
    } catch (error) {
      res.status(500).json({ message: `Hubo un problema ${error}` });
    }
  }
}
