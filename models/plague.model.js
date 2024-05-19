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

export class PlagueModel {
  static async getAll() {
    try {
      const [plagues] = await connection.query("SELECT * FROM plaga");
      return plagues;
    } catch (error) {
      throw new Error(
        "Error al obtener todas las plagas desde la base de datos"
      );
    }
  }
  static async getById({ idPlague }) {
    try {
      const [plague] = await connection.query(
        "SELECT * FROM plaga WHERE id_plaga = ?",
        [idPlague]
      );
      return plague[0];
    } catch (error) {
      throw new Error("Error al obtener la plaga desde la base de datos");
    }
  }

  static async getByName({ name }) {
    try {
      const [plague] = await connection.query(
        "SELECT * FROM plaga WHERE nombre = ?",
        [name]
      );
      return plague[0];
    } catch (error) {
      throw new Error("Error al obtener la plaga desde la base de datos");
    }
  }
  static async getIdByName({ namePlague }) {
    try {
      const plague = await connection.query(
        "SELECT id_plaga FROM plaga WHERE nombre = ?",
        [namePlague]
      );
      return plague[0];
    } catch (error) {
      throw new Error(
        "Error al obtener el ID de la plaga desde la base de datos"
      );
    }
  }
  static async create({ input }) {
    try {
      const { name, nameScientific, recommendations, actions, description } =
        input;

      const result = await connection.query(
        "INSERT INTO plaga (id_plaga, nombre, nombre_cientifico,  recomendaciones, acciones,descripcion) VALUES (NULL, ?, ?, ?, ?, ?)",
        [name, nameScientific, recommendations, actions, description]
      );
      return result;
    } catch (error) {
      throw new Error("Error al crear la plaga en la base de datos");
    }
  }
  static async getRecomendationsAndActionsPlagueByIdAnalizedImage({
    idAnalizedImage,
  }) {
    try {
      const [recomendationsandactionsplague] = await connection.query(
        `SELECT 
                    ia.*, 
                    p.*
                FROM 
                    imagenanalizada ia
                JOIN 
                    imagenanalizadaplaga iap ON ia.id_imagenanalizada = iap.id_imagenanalizada
                JOIN 
                    plaga p ON iap.id_plaga = p.id_plaga
                WHERE ia.id_imagenanalizada = ?;
                `,
        [idAnalizedImage]
      );
      return recomendationsandactionsplague;
    } catch (error) {
      throw new Error(
        "Error al obtener las recomendaciones y acciones de la plaga por ID de imagen analizada desde la base de datos"
      );
    }
  }
  static async update({ input }) {
    try {
      const {
        idPlague,
        name,
        nameScientific,
        recommendations,
        actions,
        description,
      } = input;
      const result = await connection.query(
        `UPDATE plaga
            SET nombre = ?, nombre_cientifico = ?, recomendaciones = ?, acciones = ?, descripcion = ?
            WHERE id_plaga = ?
            `,
        [name, nameScientific, recommendations, actions, description, idPlague]
      );
      return result;
    } catch (error) {
      throw new Error("Error al actualizar la plaga en la base de datos");
    }
  }
  static async delete({ idPlague }) {
    try {
      const result = await connection.query(
        `DELETE 
            FROM plaga
            WHERE id_plaga = ?
            `,
        [idPlague]
      );
      return result;
    } catch (error) {
      throw new Error("Hubo un error al eliminar la plaga en la base de datos");
    }
  }
  static async checkExist({ namePlague }) {
    const result = await connection.query(
      `
            SELECT * FROM plaga WHERE nombre = ?
            `,
      [namePlague]
    );
    return result;
  }
}
