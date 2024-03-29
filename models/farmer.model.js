import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class FarmerModel{
    static async getAll(){
        const [farmers] = await connection.query(
            `SELECT a.id_agricultor, p.*, u.* 
            FROM agricultor a 
            JOIN persona p ON a.id_persona = p.id_persona 
            JOIN usuario u ON p.id_persona = u.id_persona 
            WHERE p.estado = 'activo';`
        )
        return farmers
    }
    static async getById({idFarmer}){
        const [farmer] = await connection.query(
            'select * from agricultor where id_agricultor = ?;', [
                idFarmer
            ]
        )
        if (farmer.length === 0 ){
            return []
        }
        return farmer[0]
    }
    static async create({idPerson}){
        const result = await connection.query(
            'INSERT INTO agricultor (id_agricultor,id_persona) VALUES (NULL , ? )',
            [idPerson]
        )
        return result[0].insertId
    }
    static async getNotificationsByStatus({input}){
        const {idFarmer,status} = input
        const [notifications] = await connection.query(
            `SELECT 
            ia.*,
            a.id_agricultor,
            i.nombre AS nombre_invernadero,
            c.*,
            CONCAT_WS(', ', 
                GROUP_CONCAT(DISTINCT p.nombre), 
                GROUP_CONCAT(DISTINCT e.nombre)
            ) AS nombres_detectados
        FROM 
            agricultor a
        JOIN 
            invernadero i ON a.id_agricultor = i.id_agricultor
        JOIN 
            cama c ON i.id_invernadero = c.id_invernadero
        JOIN 
            imagenanalizada ia ON c.id_cama = ia.id_cama
        LEFT JOIN 
            imagenanalizadaenfermedad iae ON ia.id_imagenanalizada = iae.id_imagenanalizada
        LEFT JOIN 
            imagenanalizadaplaga iap ON ia.id_imagenanalizada = iap.id_imagenanalizada
        LEFT JOIN 
            plaga p ON iap.id_plaga = p.id_plaga
        LEFT JOIN 
            enfermedad e ON iae.id_enfermedad = e.id_enfermedad
        WHERE 
            a.id_agricultor = ?
            AND ia.estado = ?
        GROUP BY
            ia.id_imagenanalizada;`,
            [idFarmer,status]
        )
        return notifications
    } 
    
}