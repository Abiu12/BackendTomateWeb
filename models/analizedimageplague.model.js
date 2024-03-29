import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class AnalizedImagePlagueModel{
    static async getAll(){}
    static async getById(){}
    static async create({input}){
        const {
            idAnalizedImage,idPlague
        } = input
        await connection.query(
            `
            INSERT INTO imagenanalizadaplaga (id_imagenanalizadaplaga,id_imagenanalizada,id_plaga) VALUES
            (NULL,?,?)
            `,[idAnalizedImage,idPlague]
        )
    }
    static async update(){}
    static async delete(){}
    static async getAnalizedImagePlagueByIdAnalizedImage({idAnalizedImage}){
        const [analizedImagePlague] = await connection.query(
            'select * from imagenanalizadaplaga where id_imagenanalizada = ?',[idAnalizedImage]
            )
        return analizedImagePlague
    }
}