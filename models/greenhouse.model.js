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

export class GreenhouseModel {
  // Ya
  static async getAll() {
    try {
      const [result] = await connection.query(
        `SELECT i.*, CONCAT(p.nombre, ' ', p.primer_apellido, ' ', p.segundo_apellido) AS nombre_agricultor
                FROM invernadero i
                JOIN agricultor a ON i.id_agricultor = a.id_agricultor
                JOIN persona p ON a.id_persona = p.id_persona;`
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  // ya
  static async getById({ idGreenhouse }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM invernadero WHERE id_invernadero = ?",
        [idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ya
  static async create({ input }) {
    try {
      const { idFarmer, name, typeGreenhouse, humidity, size } = input;
      const result = await connection.query(
        "INSERT INTO invernadero (id_invernadero, id_agricultor, nombre, tipo_invernadero, humedad, tamanio) VALUES (NULL, ?, ?, ?, ?, ?)",
        [idFarmer, name, typeGreenhouse, humidity, size]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  //Ya
  static async update({ input }) {
    try {
      const { idGreenhouse, idFarmer, name, typeGreenhouse, humidity, size } =
        input;

      const result = await connection.query(
        `UPDATE invernadero
                SET id_agricultor = ?, nombre = ?, tipo_invernadero = ?, humedad = ?, tamanio = ?
                WHERE id_invernadero = ?;`,
        [idFarmer, name, typeGreenhouse, humidity, size, idGreenhouse]
      );

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  // ya
  static async getGreenhouseByIdFarmer({ idFarmer }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM invernadero WHERE id_agricultor = ?;",
        [idFarmer]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  // Ya
  static async checkExist({ nameGreenhouse }) {
    try {
      const result = await connection.query(
        `
                  SELECT * FROM invernadero WHERE nombre = ?
                  `,
        [nameGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  //Ya
  static async delete({ idGreenhouse }) {
    try {
      const result = await connection.query(
        `
        DELETE
        FROM invernadero
        WHERE id_invernadero = ?
        `,
        [idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
