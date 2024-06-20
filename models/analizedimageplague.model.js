import mysql from "mysql2/promise";
import { configDb } from "../utils/configDb.js";

const connection = await mysql.createConnection(configDb);
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
