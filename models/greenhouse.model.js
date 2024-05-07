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

export class GreenhouseModel {
  static async getAll() {
    try {
      const [greenhouses] = await connection.query(
        `SELECT i.*, CONCAT(p.nombre, ' ', p.primer_apellido, ' ', p.segundo_apellido) AS nombre_agricultor
                FROM invernadero i
                JOIN agricultor a ON i.id_agricultor = a.id_agricultor
                JOIN persona p ON a.id_persona = p.id_persona;`
      );
      return greenhouses;
    } catch (error) {
      throw new Error(
        "Error al obtener todos los invernaderos desde la base de datos"
      );
    }
  }

  static async getById({ idGreenhouse }) {
    try {
      const [greenhouse] = await connection.query(
        "SELECT * FROM invernadero WHERE id_invernadero = ?",
        [idGreenhouse]
      );
      return greenhouse[0];
    } catch (error) {
      throw new Error("Error al obtener el invernadero desde la base de datos");
    }
  }

  static async create({ input }) {
    try {
      const { idFarmer, name, typeGreenhouse, humidity, size } = input;

      const result = await connection.query(
        "INSERT INTO invernadero (id_invernadero, id_agricultor, nombre, tipo_invernadero, humedad, tamanio) VALUES (NULL, ?, ?, ?, ?, ?)",
        [idFarmer, name, typeGreenhouse, humidity, size]
      );

      return result[0].insertId;
    } catch (error) {
      throw new Error("Error al crear el invernadero en la base de datos");
    }
  }

  static async update({ input }) {
    try {
      const { idGreenhouse, idFarmer, name, typeGreenhouse, humidity, size } =
        input;

      await connection.query(
        `UPDATE invernadero
                SET id_agricultor = ?, nombre = ?, tipo_invernadero = ?, humedad = ?, tamanio = ?
                WHERE id_invernadero = ?;`,
        [idFarmer, name, typeGreenhouse, humidity, size, idGreenhouse]
      );
    } catch (error) {
      throw new Error("Error al actualizar el invernadero en la base de datos");
    }
  }

  static async getGreenhouseByIdFarmer({ idFarmer }) {
    try {
      const [greenhouses] = await connection.query(
        "SELECT * FROM invernadero WHERE id_agricultor = ?;",
        [idFarmer]
      );
      return greenhouses;
    } catch (error) {
      throw new Error(
        "Error al obtener los invernaderos por ID de agricultor desde la base de datos"
      );
    }
  }

  static async checkExist({ nameGreenhouse }) {
    const result = await connection.query(
      `
                SELECT * FROM invernadero WHERE nombre = ?
                `,
      [nameGreenhouse]
    );
    return result;
  }

  static async delete({ idGreenhouse }) {
    try {
      const result = await connection.query(
        `
        DELETE
        FROM invernadero
        WHERE id_invernadero = ?
        `,
        [idGreenhouse]
      );
      return result;
    } catch (error) {
      throw new Error("Hubo un error al eliminar el invernadero");
    }
  }
}
