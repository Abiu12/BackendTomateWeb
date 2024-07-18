import mysql from "mysql2/promise";
import { configDb } from "../config/configDb.js";

const connection = await mysql.createConnection(configDb);

export class AdminModel {
  static async getData() {
    try {
      const result = await connection.query(
        `SELECT u.*, p.*
                FROM usuario u
                JOIN persona p ON u.id_persona = p.id_persona
                WHERE u.rol = "admin" `
      );
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update({ input }) {
    try {
      const { name, surname, secondSurname, phone, email, nameUser, password } =
        input;

      const resultPerson = await connection.query(
        `UPDATE persona
        SET nombre = ?, primer_apellido = ?, segundo_apellido = ?, telefono = ?, correo_electronico = ?
        where id_persona = (select id_persona from usuario where rol = "admin")
        `,
        [name, surname, secondSurname, phone, email]
      );
      const resultUser = await connection.query(
        `UPDATE usuario
        SET nombre_usuario = ?, contrasenia = ?
        where rol = "admin"
        `,
        [nameUser, password]
      );
      if (
        resultPerson[0].affectedRows == 1 &&
        resultUser[0].affectedRows == 1
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
