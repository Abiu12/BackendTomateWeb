import mysql from 'mysql2/promise'
const config = {
    host : 'localhost',
    user : 'root',
    port : 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}

const connection = await mysql.createConnection(config)

export class UsuarioModel{
    static async getAll(){

    }
    static async getByID({id}){

    }
    static async create({input}){
        const {
            nombreUsuario,
            contrasenia,
            rol,
            idPersona
        } = input
        const result = await connection.query(
            'INSERT INTO usuario(id_usuario,nombre_usuario,contrasenia,rol,id_persona) VALUES (NULL,?,?,?,?)',
            [nombreUsuario,contrasenia,rol,idPersona]
        )
        return result
    }
    static async update({input}){

    }
    static async delete({id}){}
}