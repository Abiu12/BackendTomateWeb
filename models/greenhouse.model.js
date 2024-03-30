import mysql from 'mysql2/promise'
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
const connection = await mysql.createConnection(config);

export class GreenhouseModel{
    static async getAll(){
        const [greenhouses] = await connection.query(
        `SELECT i.*, CONCAT(p.nombre, ' ', p.primer_apellido, ' ', p.segundo_apellido) AS nombre_agricultor
            FROM invernadero i
            JOIN agricultor a ON i.id_agricultor = a.id_agricultor
            JOIN persona p ON a.id_persona = p.id_persona;`
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
    static async update({input}){
        const{
            idGreenhouse,
            idFarmer,
            name,
            typeGreenhouse,
            humidity,
            size
        } = input
        await connection.query(
            `UPDATE invernadero
            SET id_agricultor = ?, nombre = ?, tipo_invernadero = ?, humedad = ?, tamanio = ?
            WHERE id_invernadero = ?;`,
            [idFarmer,name,typeGreenhouse,humidity,size,idGreenhouse]
        )
    }
    static async getGreenhouseByIdFarmer({idFarmer}){
        const [greenhouses] = await connection.query(
            'select * from invernadero where id_agricultor = ?;',
            [idFarmer]
        )
        return greenhouses
    }

}
