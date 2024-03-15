import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class InvernaderoModel{
    static async getAll(){
        const [invernaderos] = await connection.query(
            'select * from invernadero;'
        )
        return invernaderos
    }
    static async getById(){

    }
    static async create({input}){
        const {
            idAgricultor,
            nombre,
            tipoInvernadero,
            humedad,
            tamanio
        } = input
        const result = await connection.query(
            'INSERT INTO invernadero (id_invernadero,id_agricultor,nombre,tipo_invernadero,humedad,tamanio) values (NULL,?,?,?,?,?)',
            [idAgricultor,nombre,tipoInvernadero,humedad,tamanio]
        )
        return result[0].insertId
    }
    static async update(){

    }
    static async delete(){

    }
}
