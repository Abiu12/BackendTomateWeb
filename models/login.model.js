import mysql from "mysql2/promise";

import { require } from "../utils/require.js";
const jwt = require("jsonwebtoken");
import { configDb } from "../utils/configDb.js";
import bcrypt from "bcrypt";
const connection = await mysql.createConnection(configDb);
export class LoginModel {
  // ya
  static async login({ input }) {
    try {
      const { username, password } = input;

      const response = await connection.query(
        "SELECT rol,contrasenia FROM usuario WHERE BINARY LOWER(nombre_usuario) = ?",
        [username]
      );

      if (response[0].length > 0) {
        const validatePassword = await bcrypt.compare(
          password,
          response[0][0].contrasenia
        );
        if (validatePassword) {
          const rolUsuario = response[0][0].rol;
          const token = jwt.sign({ username, rolUsuario }, "Stack", {
            expiresIn: "50m",
          });
          return { response, token };
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  // ya
  static async checkEmailExistence({ input }) {
    try {
      const { email } = input;
      const [result] = await connection.query(
        `SELECT * FROM persona WHERE correo_electronico = ? and estado = "activo"`,
        [email]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  // ya
  static async userNameExistence({ userName }) {
    try {
      const [result] = await connection.query(
        `SELECT * FROM usuario WHERE nombre_usuario = ?`,
        [userName]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  // ya
  static async getDataByUsername({ input }) {
    try {
      const { username, role } = input;
      let result;

      if (role === "farmer") {
        [result] = await connection.query(
          `
                SELECT persona.*, agricultor.*,usuario.*
                FROM usuario
                JOIN persona ON usuario.id_persona = persona.id_persona
                JOIN agricultor ON persona.id_persona = agricultor.id_persona
                WHERE usuario.nombre_usuario = ? ;
                `,
          [username]
        );
      } else if (role === "worker") {
        [result] = await connection.query(
          `
                SELECT persona.*, trabajador.*,usuario.*
                FROM usuario
                JOIN persona ON usuario.id_persona = persona.id_persona
                JOIN trabajador ON persona.id_persona = trabajador.id_persona
                WHERE usuario.nombre_usuario = ? ;
                `,
          [username]
        );
      } else if (role === "admin") {
        [result] = await connection.query(
          `
                SELECT persona.*,usuario.*
                FROM usuario
                JOIN persona ON usuario.id_persona = persona.id_persona
                WHERE usuario.nombre_usuario = ?;
                `,
          [username]
        );
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
