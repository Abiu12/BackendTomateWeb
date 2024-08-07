import mysql from "mysql2/promise";
import { configDb } from "../config/configDb.js";

const connection = await mysql.createConnection(configDb);
export class AnalizedImageModel {
  static async create({ input }) {
    try {
      const { path, date, idBed, status } = input;
      const result = await connection.query(
        `
                INSERT INTO imagenanalizada (id_imagenanalizada, fecha, id_cama, estado,imagen)
                VALUES (NULL,?,?,?,?)
                `,
        [date, idBed, status, path]
      );
      return result[0].insertId;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getAnalizedImageByBed({ idBed }) {
    try {
      const [analizedImage] = await connection.query(
        "SELECT * FROM imagenanalizada WHERE id_cama = ?",
        [idBed]
      );
      return analizedImage;
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }

  static async getRecomendationsAndActionsByIdAnalizedImage({
    idAnalizedImage,
  }) {
    try {
      const [recomendationsAndActions] = await connection.query(
        `SELECT 
        ia.id_imagenanalizada,
        'enfermedad' AS tipo,
        e.nombre,
        e.nombre_cientifico,
        e.recomendaciones,
        e.acciones,
        e.descripcion
    FROM 
        imagenanalizadaenfermedad iae
    JOIN 
        enfermedad e ON iae.id_enfermedad = e.id_enfermedad
    JOIN 
        imagenanalizada ia ON ia.id_imagenanalizada = iae.id_imagenanalizada
    WHERE 
        ia.id_imagenanalizada = ?
    UNION ALL
    SELECT 
        ia.id_imagenanalizada,
        'plaga' AS tipo,
        p.nombre,
        p.nombre_cientifico,
        p.recomendaciones,
        p.acciones,
        p.descripcion
    FROM 
        imagenanalizadaplaga iap
    JOIN 
        plaga p ON iap.id_plaga = p.id_plaga
    JOIN 
        imagenanalizada ia ON ia.id_imagenanalizada = iap.id_imagenanalizada
    WHERE 
        ia.id_imagenanalizada = ?;
                `,
        [idAnalizedImage, idAnalizedImage]
      );
      return recomendationsAndActions;
    } catch (error) {
      throw new Error(
        "Error al obtener las recomendaciones y acciones asociadas a la imagen analizada desde la base de datos" +
          error
      );
    }
  }

  static async updateStatusAnalizedImage({ input }) {
    try {
      const { idAnalizedImage, status } = input;
      const result = await connection.query(
        `UPDATE imagenanalizada
                SET estado = ?
                WHERE id_imagenanalizada = ?
                `,
        [status, idAnalizedImage]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Error al actualizar el estado de la imagen analizada en la base de datos"
      );
    }
  }
}
