import mysql from "mysql2/promise";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
const connection = await mysql.createConnection(config);

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
