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
    static async getAll(){}
    static async getById({idPlague}){
        const plague = await connection.query(
            'select * from plaga where id_plaga = ?',[idPlague]
        )
        return plague[0]
    }
    static async create({input}){
        // const {
        //     numeroCama,
        //     idInvernadero,
        //     idCultivo
        // } = input
        // const result = await connection.query(
        //     'INSERT INTO cama (id_cama,numero_cama,id_invernadero,id_cultivo) values (NULL,?,?,?)',
        //     [numeroCama,idInvernadero,idCultivo]
        // )
        // return result[0].insertId
    }
    static async update(){}
    static async delete(){}

}