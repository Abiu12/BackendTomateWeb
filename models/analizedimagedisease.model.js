import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class AnalyzedImageDiseaseModel{
    static async getAll(){}
    static async getById(){}
    static async create({input}){
        const {
            idAnalizedImage,idDisease
        } = input
        await connection.query(
            `
            INSERT INTO imagenanalizadaenfermedad (id_imagenanalizadaenfermedad,id_imagenanalizada,id_enfermedad) VALUES
            (NULL,?,?)
            `,[idAnalizedImage,idDisease]
        )
    }
    static async update(){}
    static async delete(){}
    static async getAnalizedImageDiseaseByIdAnalizedImage({idAnalizedImage}){
        const [analizedImageDisease] = await connection.query(
            'select * from imagenanalizadaenfermedad where id_imagenanalizada = ?',[idAnalizedImage]
            )
        return analizedImageDisease
    }
}