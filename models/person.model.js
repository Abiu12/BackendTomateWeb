import mysql2 from 'mysql2/promise'
const config = {
    host : 'localhost',
    user : 'root',
    port : 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}

const connection = await mysql2.createConnection(config)

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