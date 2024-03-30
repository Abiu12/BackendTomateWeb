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

export class ReportModel{
    static async getTotalAnalizedImagesByFarmerByGreenhouse({ input }) {
        try {
            const {
                idFarmer,
                idGreenhouse
            } = input;
            const [resultReport] = await connection.query(
                `SELECT COUNT(*) AS total_imagenes_analizadas
                FROM imagenanalizada ia
                JOIN cama c ON ia.id_cama = c.id_cama
                JOIN invernadero i ON c.id_invernadero = i.id_invernadero
                WHERE i.id_agricultor = ? 
                AND i.id_invernadero = ?;
                `,
                [idFarmer, idGreenhouse]
            );
            return resultReport;
        } catch (error) {
            throw new Error("Error al obtener el total de imágenes analizadas por agricultor e invernadero desde la base de datos");
        }
    }
    
    static async getMostAtackedCropByFarmerByGreenhouse({ input }) {
        try {
            const {
                idFarmer,
                idGreenhouse
            } = input;
            const [resultReport] = await connection.query(
                `SELECT c.tipo_cultivo
                FROM cama c
                JOIN imagenanalizada ia ON c.id_cama = ia.id_cama
                JOIN invernadero i ON c.id_invernadero = i.id_invernadero
                WHERE i.id_agricultor = ?
                AND i.id_invernadero = ?
                GROUP BY c.tipo_cultivo
                ORDER BY COUNT(ia.id_imagenanalizada) DESC
                LIMIT 1;
                `,
                [idFarmer, idGreenhouse]
            );
            return resultReport;
        } catch (error) {
            throw new Error("Error al obtener el cultivo más atacado por agricultor e invernadero desde la base de datos");
        }
    }
    
    static async getDiseasesByFarmerByGreenhouse({ input }) {
        try {
            const {
                idFarmer,
                idGreenhouse
            } = input;
            const [resultReport] = await connection.query(
                `SELECT c.numero_cama, e.nombre AS nombre_enfermedad
                FROM imagenanalizadaenfermedad iae
                JOIN enfermedad e ON iae.id_enfermedad = e.id_enfermedad
                JOIN imagenanalizada ia ON ia.id_imagenanalizada = iae.id_imagenanalizada
                JOIN cama c ON c.id_cama = ia.id_cama
                JOIN invernadero i ON c.id_invernadero = i.id_invernadero
                WHERE i.id_agricultor = ?
                AND i.id_invernadero = ?;
                `,
                [idFarmer, idGreenhouse]
            );
            return resultReport;
        } catch (error) {
            throw new Error("Error al obtener las enfermedades por agricultor e invernadero desde la base de datos");
        }
    }
    
    static async getPlaguesByFarmerByGreenhouse({ input }) {
        try {
            const {
                idFarmer,
                idGreenhouse
            } = input;
            const [resultReport] = await connection.query(
                `SELECT c.id_cama, p.nombre AS nombre_plaga
                FROM imagenanalizadaplaga iap
                JOIN plaga p ON iap.id_plaga = p.id_plaga
                JOIN imagenanalizada ia ON ia.id_imagenanalizada = iap.id_imagenanalizada
                JOIN cama c ON c.id_cama = ia.id_cama
                JOIN invernadero i ON c.id_invernadero = i.id_invernadero
                WHERE i.id_agricultor = ?
                AND i.id_invernadero = ?;
                `,
                [idFarmer, idGreenhouse]
            );
            return resultReport;
        } catch (error) {
            throw new Error("Error al obtener las plagas por agricultor e invernadero desde la base de datos");
        }
    }
    
    
}