import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class PlagueModel{
    static async getAll(){
        const [plagues] = await connection.query(
            'select * from plaga')
        return plagues
    }
    static async getById({idPlague}){
        const plague = await connection.query(
            'select * from plaga where id_plaga = ?',[idPlague]
        )
        return plague[0]
    }
    static async getIdByName({namePlague}){
        const plague = await connection.query(
            'select id_plaga from plaga where nombre = ?',[namePlague]
        )
        return plague[0][0].id_plaga
    }

    static async create({input}){
        const {
            name,
            nameScientific,
            recommendations,
            actions
        } = input
       
        const result = await connection.query(
            'INSERT INTO plaga (id_plaga,nombre,nombre_cientifico,recomendaciones,acciones) values (NULL,?,?,?,?)',
            [name,nameScientific,recommendations,actions]
        )
        return result[0].insertId
    }
    static async update(){}
    static async delete(){}
    static async getRecomendationsAndActionsPlagueByIdAnalizedImage({idAnalizedImage}){
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
            `,[idAnalizedImage]
        )
        return recomendationsandactionsplague
    }
}