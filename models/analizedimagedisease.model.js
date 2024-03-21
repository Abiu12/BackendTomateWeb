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
        // const {
        //     a,
        //     a,
            
        // } = input
        // const result = await connection.query(
        //     'INSERT INTO cama (id_cama,numero_cama,id_invernadero,id_cultivo) values (NULL,?,?,?)',
        //     [numeroCama,idInvernadero,idCultivo]
        // )
        // return result[0].insertId
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