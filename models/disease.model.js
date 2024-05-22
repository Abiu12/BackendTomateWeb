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

export class DiseaseModel {
  //Ya
  static async getAll() {
    try {
      const [result] = await connection.query("SELECT * FROM enfermedad");
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getById({ idDisease }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM enfermedad WHERE id_enfermedad = ?",
        [idDisease]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getByName({ name }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM enfermedad WHERE nombre = ?",
        [name]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  //Ya
  static async create({ input }) {
    try {
      const { name, nameScientific, description, recommendations, actions } =
        input;
      const result = await connection.query(
        "INSERT INTO enfermedad (id_enfermedad, nombre, nombre_cientifico, descripcion, recomendaciones, acciones) VALUES (NULL, ?, ?, ?, ?, ?)",
        [name, nameScientific, description, recommendations, actions]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getIdByName({ nameDisease }) {
    try {
      const result = await connection.query(
        "SELECT id_enfermedad FROM enfermedad WHERE nombre = ?",
        [nameDisease]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getRecomendationsAndActionsDiseaseByIdAnalizedImage({
    idAnalizedImage,
  }) {
    try {
      const [result] = await connection.query(
        `SELECT 
                    ia.*, 
                    e.*
                FROM 
                    imagenanalizada ia
                JOIN 
                    imagenanalizadaenfermedad iae ON ia.id_imagenanalizada = iae.id_imagenanalizada
                JOIN 
                    enfermedad e ON iae.id_enfermedad = e.id_enfermedad
                WHERE ia.id_imagenanalizada = ?;
                `,
        [idAnalizedImage]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async update({ input }) {
    try {
      const {
        idDisease,
        name,
        nameScientific,
        recommendations,
        actions,
        description,
      } = input;
      const result = await connection.query(
        `UPDATE enfermedad
            SET nombre = ?, nombre_cientifico = ?, recomendaciones = ?, acciones = ?, descripcion = ?
            WHERE id_enfermedad = ?
            `,
        [name, nameScientific, recommendations, actions, description, idDisease]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ya
  static async delete({ idDisease }) {
    try {
      const result = await connection.query(
        `DELETE 
            FROM enfermedad
            WHERE id_enfermedad = ?
            `,
        [idDisease]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  //Ya
  static async checkExist({ nameDisease }) {
    try {
      const result = await connection.query(
        `
                  SELECT * FROM enfermedad WHERE nombre = ?
                  `,
        [nameDisease]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
