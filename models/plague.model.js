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

}