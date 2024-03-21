import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class GreenhouseModel{
    static async getAll(){
        const [greenhouses] = await connection.query(
            'select * from invernadero;'
        )
        return greenhouses
    }
    static async getById({idGreenhouse}){
        const greenhouse = await connection.query(
            'select * from invernadero where id_invernadero=?',
            [idGreenhouse]
        )
        return greenhouse[0]
    }
    static async create({input}){
        const {
            idFarmer,
            name,
            typeGreenhouse,
            humidity,
            size
        } = input
        const result = await connection.query(
            'INSERT INTO invernadero (id_invernadero,id_agricultor,nombre,tipo_invernadero,humedad,tamanio) values (NULL,?,?,?,?,?)',
            [idFarmer,name,typeGreenhouse,humidity,size]
        )
        return result[0].insertId
    }
    static async update(){

    }
    static async delete(){

    }
    static async getGreenhouseByIdFarmer({idFarmer}){
        const [greenhouses] = await connection.query(
            'select * from invernadero where id_agricultor = ?;',
            [idFarmer]
        )
        return greenhouses
    } 
}
