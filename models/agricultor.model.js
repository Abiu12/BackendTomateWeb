import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class AgricultorModel{
    static async getAll(){
        const [agricultores] = await connection.query(
            'select * from agricultor;'
        )
        return agricultores
    }
    static async getById({id}){
        const [agricultor] = await connection.query(
            'select * from agricultor where id_agricultor = ?;', [
                id
            ]
        )
        if (agricultor.length === 0 ){
            return []
        }
        return agricultor[0]
    }
    static async create({idPersona}){
        const result = await connection.query(
            'INSERT INTO agricultor (id_agricultor,id_persona) VALUES (NULL , ? )',
            [idPersona]
        )
        return result[0].insertId
    }
    static async delete ({id}){
        const result = await connection.query(
            'DELETE FROM agricultor WHERE id_agricultor=?',[id]
        )
        return result
    }
    static async update (){

    }
}