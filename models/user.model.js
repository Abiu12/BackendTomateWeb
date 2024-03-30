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

export class UserModel{
    
    static async create({input}){
        const {
            nameUser,
            password,
            role,
            idPerson
        } = input
        const result = await connection.query(
            'INSERT INTO usuario(id_usuario,nombre_usuario,contrasenia,rol,id_persona) VALUES (NULL,?,?,?,?)',
            [nameUser,password,role,idPerson]
        )
        return result
    }
    static async update({input}){
        const {
            idPerson,
            nameUser,
            password,
        } = input
        await connection.query(
            `UPDATE usuario
            SET nombre_usuario = ?, contrasenia = ?
            WHERE id_persona = ?;
            `,
            [nameUser,password,idPerson]
        )
    }
    static async changePassword({input}){
        const {newPassword,idPerson} = input
        await connection.query(
            `UPDATE usuario
            SET contrasenia = ?
            WHERE id_persona = ?
            `,[newPassword,idPerson]
        )
        
    }

    static async delete({idPerson}){

    }
    static async getByIdPerson({idPerson}){
        const user = await connection.query(
            'select * from usuario where id_persona=?',
            [idPerson]
        )
        return user[0][0]
    }
}