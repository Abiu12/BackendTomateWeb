import { spawn } from "child_process";

import { AnalizedImageModel } from "../models/analyzedimage.model.js";
import { PlagueModel } from "../models/plague.model.js";
import { AnalizedImagePlagueModel } from "../models/analizedimageplague.model.js";
import { DiseaseModel } from "../models/disease.model.js";
import { AnalyzedImageDiseaseModel } from "../models/analizedimagedisease.model.js";
import { unlink } from "fs/promises";

// Firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import firebaseConfig from "../config/firebase.config.js";

import { createRequire } from "node:module";
import { UserModel } from "../models/user.model.js";
const require = createRequire(import.meta.url);
const fs = require("fs");

export class AnalizeImageController {
  //Ya
  static async detected(req, res) {
    try {
      const imageFile = req.file;
      const { idBed, idUser } = req.params;

      const urlImage = imageFile.path;
      const detection = await AnalizeImageController.script(urlImage);
      const resultDeteccion = AnalizeImageController.filterDetection(detection);
      await unlink(urlImage);
      //si detecto algo lo registramos
      if (resultDeteccion.names.length > 0) {
        const storage = getStorage(firebaseConfig.appFirebase);
        const imageRef = ref(storage, `images/${resultDeteccion.name_image}`);
        const imagenBuffer = fs.readFileSync(resultDeteccion.full_path);
        await uploadBytes(imageRef, imagenBuffer);
        const downloadURL = await getDownloadURL(imageRef);
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
          const responseRegisterName =
            await AnalizeImageController.registerName(name, idAnalizedImage);
          if (!responseRegisterName) {
            return res.status(404).json({
              message: `Hubo un error en las plagas y enfermedades ya registradas`,
            });
          }
        }
        //Generar la notificación.
        const expoToken = await UserModel.getTokenByIdUser({ idUser });
        if (expoToken[0]) {
          const responseNotification =
            await AnalizeImageController.sendNotification(
              expoToken[0].notificacion_token
            );
          if (responseNotification) {
            return res.json({
              message: "Imagen analizada correctamente, espere su notificación",
            });
          }
        }
      }
      return res.json({ message: "No se ha detectado nada en la imagen" });
    } catch (error) {
      res.status(500).json({ message: `Hubo un error ${error}` });
    }
  }
  static async detectedWeb(req, res) {
    try {
      const imageFile = req.file;
      const { idBed } = req.params;

      const urlImage = imageFile.path;
      const detection = await AnalizeImageController.script(urlImage);
      const resultDeteccion = AnalizeImageController.filterDetection(detection);
      await unlink(urlImage);
      //si detecto algo lo registramos
      if (resultDeteccion.names.length > 0) {
        const storage = getStorage(firebaseConfig.appFirebase);
        const imageRef = ref(storage, `images/${resultDeteccion.name_image}`);
        const imagenBuffer = fs.readFileSync(resultDeteccion.full_path);
        await uploadBytes(imageRef, imagenBuffer);
        const downloadURL = await getDownloadURL(imageRef);
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
          const responseRegisterName =
            await AnalizeImageController.registerName(name, idAnalizedImage);
          if (!responseRegisterName) {
            return res.status(404).json({
              message: `Hubo un error en las plagas y enfermedades ya registradas`,
            });
          }
        }
        return res.status(200).json({ message: "Se ha analizado la imagen" });
      }
      return res.json({ message: "No se ha detectado nada en la imagen" });
    } catch (error) {
      res.status(500).json({ message: `Hubo un error ${error}` });
    }
  }
  //Ya
  static async detectedGuest(req, res) {
    try {
      const imageFile = req.file;
      const { tokenNotification } = req.params;
      const urlImage = imageFile.path;
      const detection = await AnalizeImageController.script(urlImage);
      const resultDeteccion = AnalizeImageController.filterDetection(detection);
      await unlink(urlImage);
      //si detecto algo lo registramos
      if (resultDeteccion.names.length > 0) {
        const storage = getStorage(firebaseConfig.appFirebase);
        const imageRef = ref(storage, `guest/${resultDeteccion.name_image}`);
        const imagenBuffer = fs.readFileSync(resultDeteccion.full_path);
        await uploadBytes(imageRef, imagenBuffer);
        const downloadURL = await getDownloadURL(imageRef);

        const responseNotification =
          await AnalizeImageController.sendNotification(tokenNotification);

        const body = {
          urlImage: downloadURL,
          detected: resultDeteccion,
        };
        return res.status(200).json({ body });
      }
      return res
        .status(404)
        .json({ message: "No se ha detectado nada en la imagen" });
    } catch (error) {
      res.status(500).json({ message: `Hubo un error ${error}` });
    }
  }
  //Ya
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
  //Ya
  static script(urlImage) {
    return new Promise((resolve, reject) => {
      let datos = "";
      // Comando para ejecutar el script de Python
      const pythonProcess = spawn("python", ["yolo.py", urlImage]);
      // Capturar la salida del proceso
      pythonProcess.stdout.on("data", (data) => {
        datos += data.toString(); // Recopilar los datos en una variable
      });
      // Capturar los errores del proceso
      pythonProcess.stderr.on("data", (data) => {});
      // Manejar el cierre del proceso
      pythonProcess.on("close", (code) => {
        try {
          const regex = /{([^}]*)}/;
          const match = datos.match(regex); // Buscar coincidencia en el texto
          const resultados = JSON.parse(match[0]); // Analizar los datos como JSON
          resolve(resultados);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
  //Ya
  static async sendNotification(to) {
    const message = {
      to: to,
      sound: "default",
      title: "¡Alerta, atacan tus tomates🥺!",
      body: "Da clic para ver tus notificaciones",
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
  //Ya
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
