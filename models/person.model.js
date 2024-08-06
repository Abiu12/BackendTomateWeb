import mysql from "mysql2/promise";
import { configDb } from "../config/configDb.js";

const connection = await mysql.createConnection(configDb);
export class PersonModel {
  //Ya
  static async create({ input }) {
    try {
      const { name, surname, secondSurname, phone, email } = input;

      const result = await connection.query(
        "INSERT INTO persona (id_persona, nombre, primer_apellido, segundo_apellido, telefono, correo_electronico, estado) VALUES (NULL, ?, ?, ?, ?, ?, ?)",
        [name, surname, secondSurname, phone, email, "activo"]
      );
      if (result) {
        return result[0].insertId;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getById({ idPerson }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM persona WHERE id_persona = ?;",
        [idPerson]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  // ya
  static async getByEmail({ email }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM persona WHERE correo_electronico = ? AND estado ='activo';",
        [email]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Ya
  static async delete({ idPerson, idFarmer }) {
    try {
      // Iniciar una transacción
      await connection.beginTransaction();
      await connection.query(
        `
  DELETE FROM imagenanalizadaplaga
  WHERE id_imagenanalizada IN (
    SELECT id_imagenanalizada FROM imagenanalizada WHERE id_cama IN (
      SELECT id_cama FROM cama WHERE id_invernadero IN (
        SELECT id_invernadero FROM invernadero WHERE id_agricultor = ?
      )
    )
  )
`,
        [idFarmer]
      );

      await connection.query(
        `
  DELETE FROM imagenanalizadaenfermedad
  WHERE id_imagenanalizada IN (
    SELECT id_imagenanalizada FROM imagenanalizada WHERE id_cama IN (
      SELECT id_cama FROM cama WHERE id_invernadero IN (
        SELECT id_invernadero FROM invernadero WHERE id_agricultor = ?
      )
    )
  )
`,
        [idFarmer]
      );

      await connection.query(
        `
  DELETE FROM imagenanalizada
  WHERE id_cama IN (
    SELECT id_cama FROM cama WHERE id_invernadero IN (
      SELECT id_invernadero FROM invernadero WHERE id_agricultor = ?
    )
  )
`,
        [idFarmer]
      );

      await connection.query(
        `
  DELETE FROM cama
  WHERE id_invernadero IN (
    SELECT id_invernadero FROM invernadero WHERE id_agricultor = ?
  )
`,
        [idFarmer]
      );

      await connection.query(
        `
  DELETE FROM invernadero
  WHERE id_agricultor = ?
`,
        [idFarmer]
      );

      await connection.query(
        `
  DELETE FROM agricultor
  WHERE id_agricultor = ?
`,
        [idFarmer]
      );

      await connection.query(
        `
                UPDATE persona
                SET estado = 'inactivo'
                WHERE id_persona = ?;
                `,
        [idPerson]
      );

      // Confirmar la transacción
      await connection.commit();

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  //Ya
  static async update({ input }) {
    try {
      const { idPerson, name, surname, secondSurname, phone, email } = input;
      const result = await connection.query(
        `UPDATE persona
                SET nombre = ?, primer_apellido = ?, segundo_apellido = ?, telefono = ?, correo_electronico = ?
                WHERE id_persona = ?;`,
        [name, surname, secondSurname, phone, email, idPerson]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
