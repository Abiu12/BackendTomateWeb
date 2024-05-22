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

export class AnalizedImagePlagueModel {
  static async create({ input }) {
    try {
      const { idAnalizedImage, idPlague } = input;
      const result = await connection.query(
        `
                INSERT INTO imagenanalizadaplaga (id_imagenanalizadaplaga, id_imagenanalizada, id_plaga) VALUES
                (NULL,?,?)
                `,
        [idAnalizedImage, idPlague]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAnalizedImagePlagueByIdAnalizedImage({ idAnalizedImage }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM imagenanalizadaplaga WHERE id_imagenanalizada = ?",
        [idAnalizedImage]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
