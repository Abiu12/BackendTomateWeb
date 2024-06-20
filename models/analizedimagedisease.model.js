import mysql from "mysql2/promise";
import { configDb } from "../utils/configDb.js";

const connection = await mysql.createConnection(configDb);
export class AnalyzedImageDiseaseModel {
  static async create({ input }) {
    try {
      const { idAnalizedImage, idDisease } = input;
      const result = await connection.query(
        `
                INSERT INTO imagenanalizadaenfermedad (id_imagenanalizadaenfermedad, id_imagenanalizada, id_enfermedad) VALUES
                (NULL,?,?)
                `,
        [idAnalizedImage, idDisease]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAnalizedImageDiseaseByIdAnalizedImage({ idAnalizedImage }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM imagenanalizadaenfermedad WHERE id_imagenanalizada = ?",
        [idAnalizedImage]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
