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

export class DashboardModel {
  //Ya
  static async getTotalPlaguesByIdGreenhouse({ idGreenhouse }) {
    try {
      const result = await connection.query(
        `
      SELECT COUNT(iap.id_plaga) as cantidad_plagas
      FROM invernadero as inv
      JOIN cama as c ON c.id_invernadero = inv.id_invernadero
      JOIN imagenanalizada as ia ON ia.id_cama = c.id_cama
      JOIN imagenanalizadaplaga as iap ON iap.id_imagenanalizada = ia.id_imagenanalizada
      WHERE inv.id_invernadero = ?;`,
        [idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  //Ya
  static async getTotalDiseasesByIdGreenhouse({ idGreenhouse }) {
    try {
      const result = await connection.query(
        `
      SELECT COUNT(iae.id_enfermedad) as cantidad_plagas
      FROM invernadero as inv
      JOIN cama as c ON c.id_invernadero = inv.id_invernadero
      JOIN imagenanalizada as ia ON ia.id_cama = c.id_cama
      JOIN imagenanalizadaenfermedad as iae ON iae.id_imagenanalizada = ia.id_imagenanalizada
      WHERE inv.id_invernadero = ?;`,
        [idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getTotalImagesAnalizedByStatus({ idGreenhouse }) {
    try {
      const result = await connection.query(
        `
      SELECT 
      ia.estado AS Estado,
      COUNT(ia.id_imagenanalizada) AS Cantidad
  FROM 
      imagenanalizada ia
  INNER JOIN 
      cama c ON ia.id_cama = c.id_cama
  WHERE 
      c.id_invernadero = ?
  GROUP BY 
      ia.estado;
      `,
        [idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getCountPlagues({ idGreenhouse }) {
    try {
      const result = await connection.query(
        `
      SELECT 
      p.nombre AS Nombre,
      COUNT(iap.id_plaga) AS Cantidad
      FROM 
        imagenanalizada ia
      INNER JOIN 
      cama c ON ia.id_cama = c.id_cama
      INNER JOIN 
      imagenanalizadaplaga iap ON ia.id_imagenanalizada = iap.id_imagenanalizada
      INNER JOIN 
      plaga p ON iap.id_plaga = p.id_plaga
      WHERE 
      c.id_invernadero = ?
      GROUP BY 
      p.nombre;
        `,
        [idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getCountDiseases({ idGreenhouse }) {
    try {
      const result = await connection.query(
        `
      SELECT 
      p.nombre AS Nombre,
      COUNT(iap.id_enfermedad) AS Cantidad
      FROM 
        imagenanalizada ia
      INNER JOIN 
      cama c ON ia.id_cama = c.id_cama
      INNER JOIN 
      imagenanalizadaenfermedad iap ON ia.id_imagenanalizada = iap.id_imagenanalizada
      INNER JOIN 
      enfermedad p ON iap.id_enfermedad = p.id_enfermedad
      WHERE 
      c.id_invernadero = ?
      GROUP BY 
      p.nombre;
        `,
        [idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async totalPlaguesDiseases({ idGreenhouse }) {
    try {
      const result = await connection.query(
        `
        SELECT 
    ia.fecha,
    COALESCE(SUM(CASE WHEN iap.id_plaga IS NOT NULL THEN 1 ELSE 0 END), 0) AS Cantidad_Plagas,
    COALESCE(SUM(CASE WHEN iae.id_enfermedad IS NOT NULL THEN 1 ELSE 0 END), 0) AS Cantidad_Enfermedades
FROM 
    imagenanalizada ia
LEFT JOIN 
    cama c ON ia.id_cama = c.id_cama
LEFT JOIN 
    imagenanalizadaplaga iap ON ia.id_imagenanalizada = iap.id_imagenanalizada
LEFT JOIN 
    imagenanalizadaenfermedad iae ON ia.id_imagenanalizada = iae.id_imagenanalizada
WHERE 
    c.id_invernadero = ?
GROUP BY 
    ia.fecha
ORDER BY 
    ia.fecha;
        `,
        [idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
