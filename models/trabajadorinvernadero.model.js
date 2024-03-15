import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class TrabajadorInvernaderoModel{
    static async create({input}){
        const {
            idTrabajador,
            idInvernadero,
        } = input
        const result = await connection.query(
            'INSERT INTO trabajadorinvernadero(id_trabajadorinvernadero,id_trabajador,id_invernadero) values (NULL,?,?)'
            ,[idTrabajador,idInvernadero]
        )
        return result[0].insertId
    }
}