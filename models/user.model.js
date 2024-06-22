import mysql from "mysql2/promise";
import { configDb } from "../utils/configDb.js";

const connection = await mysql.createConnection(configDb);
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
      throw new Error(error);
    }
  }
  static async update({ input }) {
    try {
      const { idPerson, nameUser, password } = input;
      const result = await connection.query(
        `UPDATE usuario
                SET nombre_usuario = ?, contrasenia = ?
                WHERE id_persona = ?;
                `,
        [nameUser, password, idPerson]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async changePassword({ input }) {
    try {
      const { newPassword, idPerson } = input;
      const result = await connection.query(
        `UPDATE usuario
                SET contrasenia = ?
                WHERE id_persona = ?
                `,
        [newPassword, idPerson]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getByIdPerson({ idPerson }) {
    try {
      const [result] = await connection.query(
        "SELECT * FROM usuario WHERE id_persona = ?",
        [idPerson]
      );
      return result;
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
    }
  }
  static async delete({ idPerson }) {
    try {
      const result = await connection.query(
        `
        DELETE from usuario
        WHERE id_persona = ?
        `,
        [idPerson]
      );
      return result;
    } catch (error) {
      throw new Error(error);
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
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getTokenByIdUser({ idUser }) {
    try {
      const result = await connection.query(
        `SELECT notificacion_token FROM usuario WHERE id_usuario = ?`,
        idUser
      );
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }
}
