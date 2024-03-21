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
            'select * from trabajadorinvernadero where id_trabajador=?',
            [idWorker]
        )
        return greenhousesByWorker
    }
}