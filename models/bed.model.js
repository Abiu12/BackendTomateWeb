import mysql from "mysql2/promise";
import { configDb } from "../config/configDb.js";

const connection = await mysql.createConnection(configDb);
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
  static async delete({ idBed }) {
    try {
      try {
        await connection.beginTransaction();
        await connection.query(
          `
        DELETE FROM imagenanalizadaplaga
        WHERE id_imagenanalizada IN (
          SELECT id_imagenanalizada FROM imagenanalizada WHERE id_cama = ?
        )
      `,
          [idBed]
        );
        await connection.query(
          `
        DELETE FROM imagenanalizadaenfermedad
        WHERE id_imagenanalizada IN (
          SELECT id_imagenanalizada FROM imagenanalizada WHERE id_cama = ?
        )
      `,
          [idBed]
        );
        await connection.query(
          `
        DELETE FROM imagenanalizada
        WHERE id_cama = ?
      `,
          [idBed]
        );
        await connection.query(
          `
        DELETE FROM cama
        WHERE id_cama = ?
      `,
          [idBed]
        );

        await connection.commit();
        return true;
      } catch (error) {
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
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
