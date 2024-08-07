import mysql from "mysql2/promise";
import { configDb } from "../config/configDb.js";

const connection = await mysql.createConnection(configDb);
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
  static async existsAsignGreenhouse({ idGreenhouse, idWorker }) {
    try {
      try {
        const [result] = await connection.query(
          `
        SELECT * FROM trabajadorinvernadero
        WHERE id_invernadero = ? AND id_trabajador = ?
        `,
          [idGreenhouse, idWorker]
        );
        return result;
      } catch (error) {
        throw new Error(error);
      }
    } catch (error) {}
  }
}
