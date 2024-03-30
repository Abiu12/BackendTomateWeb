import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class ReportModel{
    static async getTotalAnalizedImagesByFarmerByGreenhouse({input}){
        const {
            idFarmer,idGreenhouse
        } = input
        const [resultReport] = await connection.query(
            `SELECT COUNT(*) AS total_imagenes_analizadas
            FROM imagenanalizada ia
            JOIN cama c ON ia.id_cama = c.id_cama
            JOIN invernadero i ON c.id_invernadero = i.id_invernadero
            WHERE i.id_agricultor = ? 
            AND i.id_invernadero = ?;
            `,[idFarmer,idGreenhouse]
        )
        return resultReport
    }
    static async getMostAtackedCropByFarmerByGreenhouse({input}){
        const {
            idFarmer,idGreenhouse
        } = input
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
            `,[idFarmer,idGreenhouse]
        )
        return resultReport
    }
    static async getDiseasesByFarmerByGreenhouse({input}){
        const {
            idFarmer,idGreenhouse
        } = input
        const [resultReport] = await connection.query(
            `SELECT c.numero_cama, e.nombre AS nombre_enfermedad
            FROM imagenanalizadaenfermedad iae
            JOIN enfermedad e ON iae.id_enfermedad = e.id_enfermedad
            JOIN imagenanalizada ia ON ia.id_imagenanalizada = iae.id_imagenanalizada
            JOIN cama c ON c.id_cama = ia.id_cama
            JOIN invernadero i ON c.id_invernadero = i.id_invernadero
            WHERE i.id_agricultor = ?
            AND i.id_invernadero = ?;
            `,[idFarmer,idGreenhouse]
        )
        return resultReport
    }
    static async getPlaguesByFarmerByGreenhouse({input}){
        const {
            idFarmer,idGreenhouse
        } = input
        const [resultReport] = await connection.query(
            `SELECT c.id_cama, p.nombre AS nombre_plaga
            FROM imagenanalizadaplaga iap
            JOIN plaga p ON iap.id_plaga = p.id_plaga
            JOIN imagenanalizada ia ON ia.id_imagenanalizada = iap.id_imagenanalizada
            JOIN cama c ON c.id_cama = ia.id_cama
            JOIN invernadero i ON c.id_invernadero = i.id_invernadero
            WHERE i.id_agricultor = ?
            AND i.id_invernadero = ?;
            `,[idFarmer,idGreenhouse]
        )
        return resultReport
    }
    
}