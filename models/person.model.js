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

export class PersonModel{
    static async create({input}){
        const {
            name,
            surname,
            secondSurname,
            phone,
            email
        } = input
        const result = await connection.query(
            'insert into persona (id_persona, nombre, primer_apellido,segundo_apellido,telefono,correo_electronico,estado) values (NULL, ?,?,?,?,?,?)',
            [name,surname,secondSurname,phone,email,'activo']
        )
        return result[0].insertId
    }
    static async getById({idPerson}){
        const [person] = await connection.query(
            'select * from persona where id_persona = ?;', [
                idPerson
            ]
        )
        if (person.length === 0 ){
            return []
        }
        return person[0]
    }
    static async delete ({idPerson}){
        const result = await connection.query(
            `
            UPDATE persona
            SET estado = 'inactivo'
            WHERE id_persona = ?;
            ` ,[idPerson]
        )
        return result
    }
    static async update ({input}){
        const{
            idPerson,
            name,
            surname,
            secondSurname,
            phone,
            email
        } = input
        await connection.query(
            `UPDATE persona
            SET nombre = ?, primer_apellido = ?, segundo_apellido = ?, telefono = ?, correo_electronico = ?
            WHERE id_persona = ?;`,
            [name,surname,secondSurname,phone,email,idPerson]
        )
    }
}