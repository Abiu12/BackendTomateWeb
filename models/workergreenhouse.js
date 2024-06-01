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

export class WorkerGreenhouseModel {
  //Ya
  static async create({ input }) {
    try {
      const { idWorker, idGreenhouse } = input;
      const result = await connection.query(
        "INSERT INTO trabajadorinvernadero (id_trabajadorinvernadero, id_trabajador, id_invernadero) VALUES (NULL, ?, ?)",
        [idWorker, idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  // ya
  static async getGreenhousesByIdWorker({ idWorker }) {
    try {
      const [result] = await connection.query(
        `
                SELECT ti.id_trabajadorinvernadero, ti.id_trabajador, i.*, CONCAT(p.nombre, ' ', p.primer_apellido, ' ', p.segundo_apellido) AS nombre_agricultor
                FROM trabajadorinvernadero ti 
                JOIN invernadero i ON ti.id_invernadero = i.id_invernadero
                JOIN agricultor a ON i.id_agricultor = a.id_agricultor
                JOIN persona p ON a.id_persona = p.id_persona
                WHERE id_trabajador = ?;
                `,
        [idWorker]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async deleteAsignGreenhouse({ idWorkerGreenhouse }) {
    try {
      const result = await connection.query(
        `DELETE
        FROM trabajadorinvernadero
        WHERE id_trabajadorinvernadero = ?
        `,
        [idWorkerGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
