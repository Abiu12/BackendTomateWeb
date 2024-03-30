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

export class PlagueModel{
    static async getAll() {
        try {
            const [plagues] = await connection.query(
                'SELECT * FROM plaga'
            );
            return plagues;
        } catch (error) {
            throw new Error("Error al obtener todas las plagas desde la base de datos");
        }
    }
    
    static async getById({ idPlague }) {
        try {
            const [plague] = await connection.query(
                'SELECT * FROM plaga WHERE id_plaga = ?',
                [idPlague]
            );
            return plague[0];
        } catch (error) {
            throw new Error("Error al obtener la plaga desde la base de datos");
        }
    }
    
    static async getIdByName({ namePlague }) {
        try {
            const plague = await connection.query(
                'SELECT id_plaga FROM plaga WHERE nombre = ?',
                [namePlague]
            );
            return plague[0][0].id_plaga;
        } catch (error) {
            throw new Error("Error al obtener el ID de la plaga desde la base de datos");
        }
    }
    

    static async create({ input }) {
        try {
            const {
                name,
                nameScientific,
                recommendations,
                actions
            } = input;
    
            const result = await connection.query(
                'INSERT INTO plaga (id_plaga, nombre, nombre_cientifico, recomendaciones, acciones) VALUES (NULL, ?, ?, ?, ?)',
                [name, nameScientific, recommendations, actions]
            );
    
            return result[0].insertId;
        } catch (error) {
            throw new Error("Error al crear la plaga en la base de datos");
        }
    }
    
    static async getRecomendationsAndActionsPlagueByIdAnalizedImage({ idAnalizedImage }) {
        try {
            const [recomendationsandactionsplague] = await connection.query(
                `SELECT 
                    ia.*, 
                    p.*
                FROM 
                    imagenanalizada ia
                JOIN 
                    imagenanalizadaplaga iap ON ia.id_imagenanalizada = iap.id_imagenanalizada
                JOIN 
                    plaga p ON iap.id_plaga = p.id_plaga
                WHERE ia.id_imagenanalizada = ?;
                `,
                [idAnalizedImage]
            );
            return recomendationsandactionsplague;
        } catch (error) {
            throw new Error("Error al obtener las recomendaciones y acciones de la plaga por ID de imagen analizada desde la base de datos");
        }
    }
    
}