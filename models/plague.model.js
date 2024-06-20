import mysql from "mysql2/promise";
import { configDb } from "../utils/configDb.js";

const connection = await mysql.createConnection(configDb);
export class PlagueModel {
  // ya
  static async getAll() {
    try {
      const [result] = await connection.query("SELECT * FROM plaga");
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  // ya
  static async getById({ idPlague }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM plaga WHERE id_plaga = ?",
        [idPlague]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getByName({ name }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM plaga WHERE nombre = ?",
        [name]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getIdByName({ namePlague }) {
    try {
      const [result] = await connection.query(
        "SELECT id_plaga FROM plaga WHERE nombre = ?",
        [namePlague]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  //ya
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
      throw new Error(error);
    }
  }
  static async getRecomendationsAndActionsPlagueByIdAnalizedImage({
    idAnalizedImage,
  }) {
    try {
      const [result] = await connection.query(
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
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  //ya
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
      throw new Error(error);
    }
  }
  //ya
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
      throw new Error(error);
    }
  }
  // ya
  static async checkExist({ namePlague }) {
    try {
      const [result] = await connection.query(
        `
              SELECT * FROM plaga WHERE nombre = ?
              `,
        [namePlague]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
