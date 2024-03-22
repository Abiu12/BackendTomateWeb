import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class WorkerGreenhouseModel{
    static async create({input}){
        const {
            idWorker,
            idGreenhouse,
        } = input
        const result = await connection.query(
            'INSERT INTO trabajadorinvernadero(id_trabajadorinvernadero,id_trabajador,id_invernadero) values (NULL,?,?)'
            ,[idWorker,idGreenhouse]
        )
        return result[0].insertId
    }
    static async getGreenhousesByIdWorker({idWorker}){
        const [greenhousesByWorker] = await connection.query(
            `SELECT ti.id_trabajadorinvernadero,id_trabajador,i.*, CONCAT(p.nombre, ' ', p.primer_apellido, ' ', p.segundo_apellido) AS nombre_agricultor
            FROM trabajadorinvernadero ti 
            JOIN invernadero i ON ti.id_invernadero = i.id_invernadero
            JOIN agricultor a ON i.id_agricultor = a.id_agricultor
            JOIN persona p ON a.id_persona = p.id_persona where id_trabajador = ?;
            `,
            [idWorker]
        )
        return greenhousesByWorker
    }
}