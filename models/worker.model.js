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

export class WorkerModel {
  static async getAll() {
    try {
      const [workers] = await connection.query(
        `
                SELECT t.id_trabajador, t.id_agricultor, p.*, u.*
                FROM trabajador t
                JOIN persona p ON t.id_persona = p.id_persona
                JOIN usuario u ON p.id_persona = u.id_persona
                WHERE p.estado = 'activo' and u.rol = "worker"
                ;
                `
      );
      return workers;
    } catch (error) {
      throw new Error(
        "Error al obtener todos los trabajadores desde la base de datos"
      );
    }
  }

  static async getById({ idWorker }) {
    try {
      const [worker] = await connection.query(
        `
        SELECT t.*, p.*, u.*
        FROM trabajador t
        JOIN persona p ON t.id_persona = p.id_persona
        JOIN usuario u ON u.id_persona = p.id_persona
        WHERE t.id_trabajador = ? AND p.estado = 'activo';
        `,
        [idWorker]
      );
      if (worker.length === 0) {
        return [];
      }
      return worker[0];
    } catch (error) {
      throw new Error(
        "Error al obtener el trabajador por ID desde la base de datos"
      );
    }
  }

  static async create({ input }) {
    try {
      const { idFarmer, idPerson } = input;
      const result = await connection.query(
        "INSERT INTO trabajador (id_trabajador, id_agricultor, id_persona) VALUES (NULL, ?, ?)",
        [idFarmer, idPerson]
      );
      return result[0].insertId;
    } catch (error) {
      throw new Error("Error al crear el trabajador en la base de datos");
    }
  }

  static async update({ input }) {
    try {
      const { idWorker, idFarmer } = input;
      await connection.query(
        `UPDATE trabajador
                SET id_agricultor = ?
                WHERE id_trabajador = ?
                `,
        [idFarmer, idWorker]
      );
    } catch (error) {
      throw new Error("Error al actualizar el trabajador en la base de datos");
    }
  }

  static async getWorkersByIdFarmer({ idFarmer }) {
    try {
      const [farmers] = await connection.query(
        `
                SELECT t.id_trabajador, t.id_agricultor, p.*, u.*
                FROM trabajador t
                JOIN persona p ON t.id_persona = p.id_persona
                JOIN usuario u ON p.id_persona = u.id_persona
                WHERE id_agricultor = ? AND p.estado = 'activo';
                `,
        [idFarmer]
      );
      return farmers;
    } catch (error) {
      throw new Error(
        "Error al obtener los trabajadores por ID de agricultor desde la base de datos"
      );
    }
  }
}
