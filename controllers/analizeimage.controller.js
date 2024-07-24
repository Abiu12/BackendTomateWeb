import { AnalizedImageModel } from "../models/analyzedimage.model.js";
import { PlagueModel } from "../models/plague.model.js";
import { AnalizedImagePlagueModel } from "../models/analizedimageplague.model.js";
import { DiseaseModel } from "../models/disease.model.js";
import { AnalyzedImageDiseaseModel } from "../models/analizedimagedisease.model.js";
import { unlink } from "fs/promises";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import firebaseConfig from "../config/firebase.config.js";

import { createRequire } from "node:module";
import { UserModel } from "../models/user.model.js";
import { SERVER_YOLO } from "../config/serverYolo.js";
const require = createRequire(import.meta.url);
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

export class AnalizeImageController {
  static async detected(req, res) {
    try {
      const imageFile = req.file;
      const { idBed, idUser } = req.params;
      const formData = new FormData();
      formData.append("image", fs.createReadStream(imageFile.path));
      //Se manda la imagen al servidor de yolo
      const responseDetection = await axios.post(
        `${SERVER_YOLO}/analyze`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );
      await unlink(imageFile.path); // eliminamos la imagen que subio el front
      if (responseDetection.status === 200) {
        const detection = await responseDetection.data;
        if (detection.names.length > 0) {
          //obtenemos la imagen que generó
          const responseImageAnalized = await axios.get(
            `${SERVER_YOLO}/get_image/${detection.name_image}`,
            {
              responseType: "arraybuffer", // Recibir la respuesta como array de bytes
            }
          );
          if (responseImageAnalized.status === 200) {
            // Guardar la imagen en un archivo
            fs.writeFileSync(
              `${detection.name_image}`,
              Buffer.from(responseImageAnalized.data)
            );
            const resultDeteccion =
              AnalizeImageController.filterDetection(detection);
            const downloadURL =
              await AnalizeImageController.uploadImageToFirebase(
                resultDeteccion,
                idBed
              );
            AnalizeImageController.registerDataImageAnalizedToBd(
              resultDeteccion,
              downloadURL,
              idBed
            );
            await unlink(detection.name_image); // eliminamos la imagen analizada
            await axios.get(
              `${SERVER_YOLO}/delete_image/${detection.name_image}`
            ); // limpiamos el directorio del back de yolo
            //Generar la notificación.
            const expoToken = await UserModel.getTokenByIdUser({ idUser });
            if (expoToken[0]) {
              const responseNotification =
                await AnalizeImageController.sendNotification(
                  expoToken[0].notificacion_token
                );
              if (responseNotification) {
                return res.json({
                  message: "Imagen analizada correctamente",
                });
              }
            }
          }
          return res.status(500).json({
            message: "Hubo un problema al obtener la imagen con lo detectado",
          });
        }
        await axios.get(`${SERVER_YOLO} /delete_image/${detection.name_image}`); // limpiamos el directorio del back de yolo
        return res.json({ message: "No se ha detectado nada en la imagen" });
      }
      return res.status(500).json({
        message:
          "Hubo un problema en el servidor del modelo de reconocimiento de imagenes",
      });
    } catch (error) {
      res.status(500).json({ message: `Hubo un error ${error}` });
    }
  }

  static async detectedWeb(req, res) {
    try {
      const imageFile = req.file;
      const { idBed } = req.params;
      const formData = new FormData();
      formData.append("image", fs.createReadStream(imageFile.path));
      //Se manda la imagen al servidor de yolo
      const responseDetection = await axios.post(
        `${SERVER_YOLO}/analyze`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );
      await unlink(imageFile.path); // eliminamos la imagen que subio el front
      if (responseDetection.status === 200) {
        const detection = await responseDetection.data;
        if (detection.names.length > 0) {
          //obtenemos la imagen que generó
          const responseImageAnalized = await axios.get(
            `${SERVER_YOLO}/get_image/${detection.name_image}`,
            {
              responseType: "arraybuffer", // Recibir la respuesta como array de bytes
            }
          );
          if (responseImageAnalized.status === 200) {
            // Guardar la imagen en un archivo
            fs.writeFileSync(
              `${detection.name_image}`,
              Buffer.from(responseImageAnalized.data)
            );
            const resultDeteccion =
              AnalizeImageController.filterDetection(detection);
            const downloadURL =
              await AnalizeImageController.uploadImageToFirebase(
                resultDeteccion,
                idBed
              );
            AnalizeImageController.registerDataImageAnalizedToBd(
              resultDeteccion,
              downloadURL,
              idBed
            );
            await unlink(detection.name_image); // eliminamos la imagen analizada
            await axios.get(
              `${SERVER_YOLO}/delete_image/${detection.name_image}`
            ); //limpiamos el directorio del back de yolo
            return res
              .status(200)
              .json({ message: "Se ha analizado la imagen" });
          }
          return res.status(500).json({
            message: "Hubo un problema al obtener la imagen con lo detectado",
          });
        }
        await axios.get(`${SERVER_YOLO}/delete_image/${detection.name_image}`); // limpiamos el directorio del back de yolo
        return res.json({ message: "No se ha detectado nada en la imagen" });
      }
      return res.status(500).json({
        message:
          "Hubo un problema en el servidor del modelo de reconocimiento de imagenes",
      });
    } catch (error) {
      res.status(500).json({ message: `Hubo un error ${error}` });
    }
  }

  static async detectedGuest(req, res) {
    try {
      const imageFile = req.file;
      const { tokenNotification } = req.params;
      const formData = new FormData();
      formData.append("image", fs.createReadStream(imageFile.path));
      //Se manda la imagen al servidor de yolo
      const responseDetection = await axios.post(
        `${SERVER_YOLO}/analyze`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );
      await unlink(imageFile.path); // eliminamos la imagen que subio el front
      if (responseDetection.status === 200) {
        const detection = await responseDetection.data;
        if (detection.names.length > 0) {
          //obtenemos la imagen que generó
          const responseImageAnalized = await axios.get(
            `${SERVER_YOLO}/get_image/${detection.name_image}`,
            {
              responseType: "arraybuffer", // Recibir la respuesta como array de bytes
            }
          );
          if (responseImageAnalized.status === 200) {
            // Guardar la imagen en un archivo
            fs.writeFileSync(
              `${detection.name_image}`,
              Buffer.from(responseImageAnalized.data)
            );
            const resultDeteccion =
              AnalizeImageController.filterDetection(detection);
            const storage = getStorage(firebaseConfig.appFirebase);
            const imageRef = ref(
              storage,
              `guest/${resultDeteccion.name_image}`
            );
            const imagenBuffer = fs.readFileSync(resultDeteccion.full_path);
            await uploadBytes(imageRef, imagenBuffer);
            const downloadURL = await getDownloadURL(imageRef);

            await AnalizeImageController.sendNotification(tokenNotification);

            const body = {
              urlImage: downloadURL,
              detected: resultDeteccion,
            };
            return res.status(200).json({ body });
          }
          return res.status(500).json({
            message: "Hubo un problema al obtener la imagen con lo detectado",
          });
        }
        await axios.get(`${SERVER_YOLO}/cleandirectory`); // limpiamos el directorio del back de yolo
        return res.json({ message: "No se ha detectado nada en la imagen" });
      }
      return res.status(500).json({
        message:
          "Hubo un problema en el servidor del modelo de reconocimiento de imagenes",
      });
    } catch (error) {
      res.status(500).json({ message: `Hubo un error ${error}` });
    }
  }
  static async uploadImageToFirebase(resultDeteccion) {
    const storage = getStorage(firebaseConfig.appFirebase);
    const imageRef = ref(storage, `images/${resultDeteccion.name_image}`);
    const imagenBuffer = fs.readFileSync(resultDeteccion.name_image);
    await uploadBytes(imageRef, imagenBuffer);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  }
  static async registerDataImageAnalizedToBd(
    resultDeteccion,
    downloadURL,
    idBed
  ) {
    const date = new Date();
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    const idAnalizedImage = await AnalizedImageModel.create({
      input: {
        path: downloadURL,
        idBed,
        date: formattedDate,
        status: "Sin ver",
      },
    });
    for (const name of resultDeteccion.names) {
      const responseRegisterName = await AnalizeImageController.registerName(
        name,
        idAnalizedImage
      );
      if (!responseRegisterName) {
        return res.status(404).json({
          message: `Hubo un error en las plagas y enfermedades ya registradas`,
        });
      }
    }
  }
  static filterDetection(detection) {
    if (detection && Array.isArray(detection.names)) {
      const uniqueNames = detection.names.filter((name, index) => {
        return detection.names.indexOf(name) === index;
      });
      detection.names = uniqueNames;
      return detection;
    } else {
      return detection;
    }
  }
  static async sendNotification(to) {
    const message = {
      to: to,
      sound: "default",
      title: "¡Alerta, atacan tu cultivo🥺!",
      body: "Revisa tus notificaciones",
      data: { someData: "Por fin" },
    };
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }
  static async registerName(name, idAnalizedImage) {
    try {
      let id;
      if (name == "Araña roja" || name == "Mosca blanca") {
        id = await PlagueModel.getIdByName({ namePlague: name });
        if (id.length > 0) {
          const response = await AnalizedImagePlagueModel.create({
            input: { idAnalizedImage, idPlague: id[0].id_plaga },
          });
          if (response[0].affectedRows == 1) {
            return true;
          }
        }
        return false;
      } else if (
        name == "Alternariosis" ||
        name == "Botritis" ||
        name == "Mildiu del tomate" ||
        name == "Oídio"
      ) {
        id = await DiseaseModel.getIdByName({ nameDisease: name });
        if (id.length > 0) {
          const response = await AnalyzedImageDiseaseModel.create({
            input: { idAnalizedImage, idDisease: id[0].id_enfermedad },
          });
          if (response[0].affectedRows == 1) {
            return true;
          }
        }
        return false;
      }
    } catch (error) {
      throw new Error(`Hubo un error: ${error}`);
    }
  }
}
