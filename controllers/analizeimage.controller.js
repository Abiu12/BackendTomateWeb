import { spawn } from "child_process";

import { AnalizedImageModel } from "../models/analyzedimage.model.js";
import { PlagueModel } from "../models/plague.model.js";
import { AnalizedImagePlagueModel } from "../models/analizedimageplague.model.js";
import { DiseaseModel } from "../models/disease.model.js";
import { AnalyzedImageDiseaseModel } from "../models/analizedimagedisease.model.js";
import { readFile, unlink } from "fs/promises";

// Firebase
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import firebaseConfig from "../config/firebase.config.js";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const fs = require("fs");

export class AnalizeImageController {
  static async detected(req, res) {
    const imageFile = req.file;
    const { idBed } = req.params;
    const urlImage = imageFile.path;
    // const urlImage = "C:/Users/calle/OneDrive/Escritorio/Abiu/Residencia/App web/BackendTomateWeb/uploads/1a883c56474cb176994b4a926e1e76f3"
    const detection = await AnalizeImageController.script(urlImage);
    const resultDeteccion = AnalizeImageController.filterDetection(detection);
    // Después de usar la imagen, elimínala del sistema de archivos
    await unlink(urlImage);
    //si detecto algo lo registramos
    if (resultDeteccion.names.length > 0) {
      const message = {
        to: "ExponentPushToken[BSTfylOk0JnQQUKaNZ3hlO]",
        sound: "default",
        title: "¡Las plagas atacan tus tomates🥺!",
        body: "Picale acá para ver que se encontró en tu imagen",
        data: { someData: "Por fin" },
      };
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const storage = getStorage(firebaseConfig.appFirebase);
      const imageRef = ref(storage, `images/${resultDeteccion.name_image}`);
      const imagenBuffer = fs.readFileSync(resultDeteccion.full_path);
      // Sube el blob al Storage
      await uploadBytes(imageRef, imagenBuffer);
      // Obtiene la URL de descarga de la imagen subida
      const downloadURL = await getDownloadURL(imageRef);

      const date = new Date();
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      //Obtenemos id de la imagen creada
      const idAnalizedImage = await AnalizedImageModel.create({
        input: {
          path: downloadURL,
          idBed,
          date: formattedDate,
          status: "Sin ver",
        },
      });
      //De lo detectado registramos en las tablas de plagas y enfermedades
      for (const name of resultDeteccion.names) {
        var id = 0;
        if (name == "Araña roja" || name == "Mosca blanca") {
          id = await PlagueModel.getIdByName({ namePlague: name });
          await AnalizedImagePlagueModel.create({
            input: { idAnalizedImage, idPlague: id },
          });
        }
        if (
          name == "Alternariosis" ||
          name == "Botritis" ||
          name == "Mildiu del tomate" ||
          name == "Oídio"
        ) {
          id = await DiseaseModel.getIdByName({ nameDisease: name });
          await AnalyzedImageDiseaseModel.create({
            input: { idAnalizedImage, idDisease: id },
          });
        }
      }
      //Generar la notificación.
      return res.json({
        message: "Imagen analizada correctamente, espere su notificación",
      });
    }
    return res.json({ message: "No se ha detectado nada en la imagen" });
  }
  static filterDetection(detection) {
    // Verificar si detection tiene la propiedad 'names' y es un arreglo
    if (detection && Array.isArray(detection.names)) {
      // Filtrar los nombres únicos
      const uniqueNames = detection.names.filter((name, index) => {
        // Devolver true solo si el índice de la primera ocurrencia de 'name' es igual al índice actual
        return detection.names.indexOf(name) === index;
      });

      // Actualizar el objeto detection con los nombres únicos
      detection.names = uniqueNames;

      // Devolver el objeto detection modificado
      return detection;
    } else {
      // Si detection no tiene la propiedad 'names' o no es un arreglo, devolver el objeto sin cambios
      return detection;
    }
  }
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
}
