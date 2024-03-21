import mysql from 'mysql2/promise'
const config = {
    host : 'localhost',
    user : 'root',
    port : 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}

const connection = await mysql.createConnection(config)

export class UserModel{
    static async getAll(){

    }
    static async getByID({id}){

    }
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

    }
    static async delete({id}){}
    static async getByIdPerson({idPerson}){
        const user = await connection.query(
            'select * from usuario where id_persona=?',
            [idPerson]
        )
        return user[0][0]
    }
}