import mysql from 'mysql2/promise'
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
const connection = await mysql.createConnection(config);

export class WorkerGreenhouseModel{
    static async create({ input }) {
        try {
            const { idWorker, idGreenhouse } = input;
            const result = await connection.query(
                'INSERT INTO trabajadorinvernadero (id_trabajadorinvernadero, id_trabajador, id_invernadero) VALUES (NULL, ?, ?)',
                [idWorker, idGreenhouse]
            );
            return result[0].insertId;
        } catch (error) {
            throw new Error("Error al crear trabajadorinvernadero en la base de datos");
        }
    }
    
    static async getGreenhousesByIdWorker({ idWorker }) {
        try {
            const [greenhousesByWorker] = await connection.query(
                `
                SELECT ti.id_trabajadorinvernadero, ti.id_trabajador, i.*, CONCAT(p.nombre, ' ', p.primer_apellido, ' ', p.segundo_apellido) AS nombre_agricultor
                FROM trabajadorinvernadero ti 
                JOIN invernadero i ON ti.id_invernadero = i.id_invernadero
                JOIN agricultor a ON i.id_agricultor = a.id_agricultor
                JOIN persona p ON a.id_persona = p.id_persona
                WHERE id_trabajador = ?;
                `,
                [idWorker]
            );
            return greenhousesByWorker;
        } catch (error) {
            throw new Error("Error al obtener invernaderos por trabajador desde la base de datos");
        }
    }
    
}