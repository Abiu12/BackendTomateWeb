import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class ReportModel{
    static async
}