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

export class BedModel {
  static async create({ input }) {
    try {
      const { numberBed, typeCrop, idGreenhouse } = input;
      const result = await connection.query(
        "INSERT INTO cama (id_cama,numero_cama,tipo_cultivo,id_invernadero) values (NULL,?,?,?)",
        [numberBed, typeCrop, idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getById({ idBed }) {
    try {
      const [result] = await connection.query(
        `SELECT * FROM cama  WHERE id_cama = ?`,
        [idBed]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async update({ input }) {
    try {
      const { idBed, numberBed, typeCrop, idGreenhouse } = input;
      const result = await connection.query(
        `UPDATE cama
                SET numero_cama = ?, tipo_cultivo = ?, id_invernadero = ?
                WHERE id_cama = ?;
                `,
        [numberBed, typeCrop, idGreenhouse, idBed]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  //Ya
  static async getBedByGreenhouse({ idGreenhouse }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM cama WHERE id_invernadero = ?",
        [idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(
        "Error al obtener las camas asociadas al invernadero desde la base de datos"
      );
    }
  }
}
