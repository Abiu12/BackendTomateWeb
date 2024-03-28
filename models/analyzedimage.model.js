import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class AnalizedImageModel{
    static async create({input}){
        const{
            date,idBed,status
        } = input
        const result = await connection.query(
            `
            INSERT INTO imagenanalizada (id_imagenanalizada,fecha,id_cama,estado)
            VALUES (NULL,?,?,?)
            `, [date,idBed,status]
        )
        return result[0].insertId
    }
    static async getAnalizedImageByBed({idBed}){
        const [analizedImage] = await connection.query(
            'select * from imagenanalizada where id_cama = ?',[idBed]
            )
        return analizedImage
    }
    static async getRecomendationsAndActionsByIdAnalizedImage({idAnalizedImage}){
        const [recomendationsAndActions] = await connection.query(
            `SELECT 
                ia.id_imagenanalizada,
                'enfermedad' AS tipo,
                e.nombre,
                e.recomendaciones,
                e.acciones
            FROM 
                imagenanalizadaenfermedad iae
            JOIN 
                enfermedad e ON iae.id_enfermedad = e.id_enfermedad
            JOIN 
                imagenanalizada ia ON ia.id_imagenanalizada = iae.id_imagenanalizada
            WHERE 
                ia.id_imagenanalizada = ?
            UNION ALL
            SELECT 
                ia.id_imagenanalizada,
                'plaga' AS tipo,
                p.nombre,
                p.recomendaciones,
                p.acciones
            FROM 
                imagenanalizadaplaga iap
            JOIN 
                plaga p ON iap.id_plaga = p.id_plaga
            JOIN 
                imagenanalizada ia ON ia.id_imagenanalizada = iap.id_imagenanalizada
            WHERE 
                ia.id_imagenanalizada = ?;
            `,[idAnalizedImage,idAnalizedImage]
        )
        return recomendationsAndActions
    }
}