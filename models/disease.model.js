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

export class DiseaseModel {
    static async getAll() {
        try {
            const [diseases] = await connection.query(
                'SELECT * FROM enfermedad'
            );
            return diseases;
        } catch (error) {
            throw new Error("Error al obtener todas las enfermedades desde la base de datos");
        }
    }

    static async getById({ idDisease }) {
        try {
            const [disease] = await connection.query(
                'SELECT * FROM enfermedad WHERE id_enfermedad = ?',
                [idDisease]
            );
            return disease[0];
        } catch (error) {
            throw new Error("Error al obtener la enfermedad desde la base de datos");
        }
    }

    static async create({ input }) {
        try {
            const {
                name,
                nameScientific,
                description,
                recommendations,
                actions
            } = input;

            const result = await connection.query(
                'INSERT INTO enfermedad (id_enfermedad, nombre, nombre_cientifico, descripcion, recomendaciones, acciones) VALUES (NULL, ?, ?, ?, ?, ?)',
                [name, nameScientific, description, recommendations, actions]
            );

            return result[0].insertId;
        } catch (error) {
            throw new Error("Error al crear la enfermedad en la base de datos");
        }
    }

    static async getIdByName({ nameDisease }) {
        try {
            const disease = await connection.query(
                'SELECT id_enfermedad FROM enfermedad WHERE nombre = ?',
                [nameDisease]
            );
            if (disease[0].length > 0) {
                return disease[0][0].id_enfermedad;
            } else {
                throw new Error("La enfermedad no fue encontrada en la base de datos");
            }
        } catch (error) {
            throw new Error("Error al obtener el ID de la enfermedad desde la base de datos");
        }
    }

    static async getRecomendationsAndActionsDiseaseByIdAnalizedImage({ idAnalizedImage }) {
        try {
            const [recomendationsandactionsdisease] = await connection.query(
                `SELECT 
                    ia.*, 
                    e.*
                FROM 
                    imagenanalizada ia
                JOIN 
                    imagenanalizadaenfermedad iae ON ia.id_imagenanalizada = iae.id_imagenanalizada
                JOIN 
                    enfermedad e ON iae.id_enfermedad = e.id_enfermedad
                WHERE ia.id_imagenanalizada = ?;
                `,
                [idAnalizedImage]
            );
            return recomendationsandactionsdisease;
        } catch (error) {
            throw new Error("Error al obtener las recomendaciones y acciones de la enfermedad asociada a la imagen analizada desde la base de datos");
        }
    }
    static async update({ input }) {
        const {
            idDisease, name, nameScientific, recommendations, description, actions
        } = input
        const result = await connection.query(
            `UPDATE enfermedad
            SET nombre = ?, nombre_cientifico = ?, recomendaciones = ?, acciones = ?, descripcion = ?
            WHERE id_enfermedad = ?
            `,
            [name,nameScientific,recommendations,description,actions,idDisease]
        )
        return result
    }

}