import mysql2 from 'mysql2/promise'
const config = {
    host : 'localhost',
    user : 'root',
    port : 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}

const connection = await mysql2.createConnection(config)

export class PersonaModel{
    static async create({input}){
        const {
            nombre,
            primerApellido,
            segundoApellido,
            telefono,
            correoElectronico
        } = input
        const result = await connection.query(
            'insert into persona (id_persona, nombre, primer_apellido,segundo_apellido,telefono,correo_electronico,estado) values (NULL, ?,?,?,?,?,?)',
            [nombre,primerApellido,segundoApellido,telefono,correoElectronico,'activo']
        )
        return result[0].insertId
    }
    static async getById({id}){
        console.log(id)
        const [persona] = await connection.query(
            'select * from persona where id_persona = ?;', [
                id
            ]
        )
        if (persona.length === 0 ){
            return []
        }
        return persona[0]
    }
    static async delete ({id}){
        const result = await connection.query(
            'DELETE FROM persona WHERE id_persona=?',[id]
        )
        return result
    }
}