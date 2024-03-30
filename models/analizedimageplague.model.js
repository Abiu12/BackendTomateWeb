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

export class AnalizedImagePlagueModel{

    static async create({ input }) {
        try {
            const { idAnalizedImage, idPlague } = input;
            await connection.query(
                `
                INSERT INTO imagenanalizadaplaga (id_imagenanalizadaplaga, id_imagenanalizada, id_plaga) VALUES
                (NULL,?,?)
                `,
                [idAnalizedImage, idPlague]
            );
        } catch (error) {
            throw new Error("Error al crear la relación imagen-analizada-plaga en la base de datos");
        }
    }
    
    static async getAnalizedImagePlagueByIdAnalizedImage({ idAnalizedImage }) {
        try {
            const [analizedImagePlague] = await connection.query(
                'SELECT * FROM imagenanalizadaplaga WHERE id_imagenanalizada = ?',
                [idAnalizedImage]
            );
            return analizedImagePlague;
        } catch (error) {
            throw new Error("Error al obtener la relación imagen-analizada-plaga desde la base de datos");
        }
    }
    
}