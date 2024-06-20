import mysql from "mysql2/promise";
import { configDb } from "../utils/configDb.js";

const connection = await mysql.createConnection(configDb);
export class FarmerModel {
  //Ya
  static async getAll() {
    try {
      const [result] = await connection.query(
        `SELECT a.id_agricultor, p.*, u.* 
                FROM agricultor a 
                JOIN persona p ON a.id_persona = p.id_persona 
                JOIN usuario u ON p.id_persona = u.id_persona 
                WHERE p.estado = 'activo' and u.rol= "farmer";`
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  //Ya
  static async getById({ idFarmer }) {
    try {
      const [result] = await connection.query(
        `SELECT a.id_agricultor, p.*,u.*
                FROM agricultor a
                JOIN persona p ON a.id_persona = p.id_persona
                JOIN usuario u ON p.id_persona = u.id_persona
                WHERE id_agricultor = ?
                `,
        [idFarmer]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  //Ya
  static async create({ idPerson }) {
    try {
      const result = await connection.query(
        "INSERT INTO agricultor (id_agricultor, id_persona) VALUES (NULL, ?)",
        [idPerson]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  // Ya
  static async getNotificationsByStatus({ input }) {
    try {
      const { idFarmer, status } = input;
      const [result] = await connection.query(
        `SELECT 
                ia.*,
                a.id_agricultor,
                i.nombre AS nombre_invernadero,
                c.*,
                CONCAT_WS(', ', 
                    GROUP_CONCAT(DISTINCT p.nombre), 
                    GROUP_CONCAT(DISTINCT e.nombre)
                ) AS nombres_detectados
            FROM 
                agricultor a
            JOIN 
                invernadero i ON a.id_agricultor = i.id_agricultor
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
                a.id_agricultor = ?
                AND ia.estado = ?
            GROUP BY
                ia.id_imagenanalizada
            ORDER BY
                STR_TO_DATE(ia.fecha, '%d-%m-%Y') DESC;  -- Convertir fecha a formato reconocido y ordenar descendentemente
            `,
        [idFarmer, status]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  // Ya
  static async getNameFarmers() {
    try {
      const [result] = await connection.query(
        `SELECT a.id_agricultor, CONCAT(p.nombre,' ', p.primer_apellido,' ', p.segundo_apellido) AS nombre
        FROM agricultor a
        JOIN persona p ON a.id_persona = p.id_persona
        JOIN usuario u ON a.id_persona = u.id_persona
        WHERE p.estado = 'activo' AND u.rol = 'farmer'
      `
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteAsignGreenhouse({ idGreenhouseWorker }) {
    try {
      const result = await connection.query(
        `
      DELETE
      FROM trabajadorinvernadero
      WHERE id_trabajadorinvernadero = ?
      `,
        [idGreenhouseWorker]
      );
      return result;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
