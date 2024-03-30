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

export class AnalyzedImageDiseaseModel{
    static async create({ input }) {
        try {
            const { idAnalizedImage, idDisease } = input;
            await connection.query(
                `
                INSERT INTO imagenanalizadaenfermedad (id_imagenanalizadaenfermedad, id_imagenanalizada, id_enfermedad) VALUES
                (NULL,?,?)
                `,
                [idAnalizedImage, idDisease]
            );
        } catch (error) {
            throw new Error("Error al crear la relación imagen-analizada-enfermedad en la base de datos");
        }
    }
  
    static async getAnalizedImageDiseaseByIdAnalizedImage({ idAnalizedImage }) {
        try {
            const [analizedImageDisease] = await connection.query(
                'SELECT * FROM imagenanalizadaenfermedad WHERE id_imagenanalizada = ?',
                [idAnalizedImage]
            );
            return analizedImageDisease;
        } catch (error) {
            throw new Error("Error al obtener la relación imagen-analizada-enfermedad desde la base de datos");
        }
    }
}