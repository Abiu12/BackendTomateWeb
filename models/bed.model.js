import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class BedModel{
    static async getAll(){}
    static async getById(){}
    static async create({input}){
        const {
            numberBed,
            typeCrop,
            idGreenhouse,
        } = input
        const result = await connection.query(
            'INSERT INTO cama (id_cama,numero_cama,tipo_cultivo,id_invernadero) values (NULL,?,?,?)',
            [numberBed,typeCrop,idGreenhouse]
        )
        return result[0].insertId
    }
    static async update(){}
    static async delete(){}
    static async getBedByGreenhouse({idGreenhouse}){
        const [greenhouses] = await connection.query(
            'select * from cama where id_invernadero = ?',[idGreenhouse]
            )
        return greenhouses
    }
}