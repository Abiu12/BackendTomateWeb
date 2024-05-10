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
  static async login({ input }) {
    const { username, password } = input;
    const response = await connection.query(
      "SELECT rol FROM usuario WHERE nombre_usuario = ? AND contrasenia = ?",
      [username, password]
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
  }
  static async checkEmailExistence({ input }) {
    const { email } = input;
    const response = await connection.query(
      `SELECT * FROM persona WHERE correo_electronico = ?`,
      [email]
    );
    return response;
  }
  static async getDataByUsername({ input }) {
    try {
      const { username, password, role } = input;
      let result;
      if (role === "farmer") {
        result = await connection.query(
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
        result = await connection.query(
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
        result = await connection.query(
          `
                SELECT persona.*,usuario.*
                FROM usuario
                JOIN persona ON usuario.id_persona = persona.id_persona
                WHERE usuario.nombre_usuario = ? AND usuario.contrasenia = ?;
                `,
          [username, password]
        );
      }
      if (result == undefined || result[0].length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      throw new Error("Error al obtener los datos de la base de datos");
    }
  }
}
