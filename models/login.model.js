import mysql from "mysql2/promise";
import { config as dotenvConfig } from "dotenv";

// import { createRequire } from 'node:module'
// const require = createRequire(import.meta.url)
import { require } from "../utils/require.js";
const jwt = require("jsonwebtoken");

dotenvConfig();
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
const connection = await mysql.createConnection(config);

export class LoginModel {
  // ya
  static async login({ input }) {
    try {
      const { username, password } = input;
      const response = await connection.query(
        "SELECT rol FROM usuario WHERE BINARY LOWER(nombre_usuario) = ? AND BINARY LOWER(contrasenia) = ?",
        [username.toLowerCase(), password.toLowerCase()]
      );
      if (response[0].length > 0) {
        const rolUsuario = response[0][0].rol;
        const token = jwt.sign({ username, rolUsuario }, "Stack", {
          expiresIn: "50m",
        });
        return { response, token };
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
      const { username, password, role } = input;
      let result;
      if (role === "farmer") {
        [result] = await connection.query(
          `
                SELECT persona.*, agricultor.*,usuario.*
                FROM usuario
                JOIN persona ON usuario.id_persona = persona.id_persona
                JOIN agricultor ON persona.id_persona = agricultor.id_persona
                WHERE usuario.nombre_usuario = ? AND usuario.contrasenia = ?;
                `,
          [username, password]
        );
      } else if (role === "worker") {
        [result] = await connection.query(
          `
                SELECT persona.*, trabajador.*,usuario.*
                FROM usuario
                JOIN persona ON usuario.id_persona = persona.id_persona
                JOIN trabajador ON persona.id_persona = trabajador.id_persona
                WHERE usuario.nombre_usuario = ? AND usuario.contrasenia = ?;
                `,
          [username, password]
        );
      } else if (role === "admin") {
        [result] = await connection.query(
          `
                SELECT persona.*,usuario.*
                FROM usuario
                JOIN persona ON usuario.id_persona = persona.id_persona
                WHERE usuario.nombre_usuario = ? AND usuario.contrasenia = ?;
                `,
          [username, password]
        );
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
