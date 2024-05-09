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

export class UserModel {
  static async create({ input }) {
    try {
      const { nameUser, password, role, idPerson } = input;
      const result = await connection.query(
        "INSERT INTO usuario(id_usuario, nombre_usuario, contrasenia, rol, id_persona) VALUES (NULL, ?, ?, ?, ?)",
        [nameUser, password, role, idPerson]
      );
      return result;
    } catch (error) {
      throw new Error("Error al crear el usuario en la base de datos");
    }
  }

  static async update({ input }) {
    try {
      const { idPerson, nameUser, password } = input;
      await connection.query(
        `UPDATE usuario
                SET nombre_usuario = ?, contrasenia = ?
                WHERE id_persona = ?;
                `,
        [nameUser, password, idPerson]
      );
    } catch (error) {
      throw new Error("Error al actualizar el usuario en la base de datos");
    }
  }

  static async changePassword({ input }) {
    try {
      const { newPassword, idPerson } = input;
      await connection.query(
        `UPDATE usuario
                SET contrasenia = ?
                WHERE id_persona = ?
                `,
        [newPassword, idPerson]
      );
      return true;
    } catch (error) {
      throw new Error(
        "Error al cambiar la contraseña del usuario en la base de datos"
      );
    }
  }

  static async getByIdPerson({ idPerson }) {
    try {
      const user = await connection.query(
        "SELECT * FROM usuario WHERE id_persona = ?",
        [idPerson]
      );
      return user[0][0];
    } catch (error) {
      throw new Error(
        "Error al obtener el usuario por ID de persona desde la base de datos"
      );
    }
  }

  static async registerTokenNotification({ input }) {
    try {
      const { userName, token } = input;
      let userNameValidation = await this.checkUserNameExist({ userName });
      if (!userNameValidation) {
        return userNameValidation;
      }
      const result = await connection.query(
        `UPDATE usuario SET notificacion_token = ? WHERE nombre_usuario = ?`,
        [token, userName]
      );
      if (result[0].affectedRows == 1) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error("Error en el servidor ", error);
    }
  }

  static async checkUserNameExist({ userName }) {
    try {
      const result = await connection.query(
        `SELECT * FROM usuario WHERE nombre_usuario = ?`,
        userName
      );
      if (result[0].length == 0) return false;
      return true;
      //   return result[0];
    } catch (error) {
      throw new Error("Error en el servidor ", error);
    }
  }
}
