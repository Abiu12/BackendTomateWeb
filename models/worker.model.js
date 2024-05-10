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
  static async getNotificationsByStatus({ input }) {
    try {
      const { idWorker, status } = input;
      const [notifications] = await connection.query(
        `SELECT 
        ia.*,
        t.id_trabajador,
        i.nombre AS nombre_invernadero,
        c.*,
        CONCAT_WS(', ', 
            GROUP_CONCAT(DISTINCT p.nombre), 
            GROUP_CONCAT(DISTINCT e.nombre)
        ) AS nombres_detectados
    FROM 
        trabajador t
    JOIN 
        trabajadorinvernadero ti ON t.id_trabajador = ti.id_trabajador
    JOIN 
        invernadero i ON ti.id_invernadero = i.id_invernadero
    JOIN 
        cama c ON i.id_invernadero = c.id_invernadero
    JOIN 
        imagenanalizada ia ON c.id_cama = ia.id_cama
    LEFT JOIN 
        imagenanalizadaenfermedad iae ON ia.id_imagenanalizada = iae.id_imagenanalizada
    LEFT JOIN 
        imagenanalizadaplaga iap ON ia.id_imagenanalizada = iap.id_imagenanalizada
    LEFT JOIN 
        plaga p ON iap.id_plaga = p.id_plaga
    LEFT JOIN 
        enfermedad e ON iae.id_enfermedad = e.id_enfermedad
    WHERE 
        t.id_trabajador = ?  
        AND ia.estado = ?  
    GROUP BY
        ia.id_imagenanalizada
    ORDER BY
        STR_TO_DATE(ia.fecha, '%d-%m-%Y') DESC;
            `,
        [idWorker, status]
      );
      return notifications;
    } catch (error) {
      throw new Error(
        "Error al obtener las notificaciones por estado desde la base de datos"
      );
    }
  }
}
