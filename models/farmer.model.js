import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class FarmerModel{
    static async getAll(){
        const [farmers] = await connection.query(
            'SELECT a.id_agricultor, p.*, u.* FROM agricultor a JOIN persona p ON a.id_persona = p.id_persona JOIN usuario u ON p.id_persona = u.id_persona;'
        )
        return farmers
    }
    static async getById({idFarmer}){
        const [farmer] = await connection.query(
            'select * from agricultor where id_agricultor = ?;', [
                idFarmer
            ]
        )
        if (farmer.length === 0 ){
            return []
        }
        return farmer[0]
    }
    static async create({idPerson}){
        const result = await connection.query(
            'INSERT INTO agricultor (id_agricultor,id_persona) VALUES (NULL , ? )',
            [idPerson]
        )
        return result[0].insertId
    }
    static async delete ({id}){
        const result = await connection.query(
            'DELETE FROM agricultor WHERE id_agricultor=?',[id]
        )
        return result
    }
    // static async update ({input}){
    //     const {
    //         idFarmer,
    //         name,
    //         surname,
    //         secondSurname,
    //         phone,
    //         email
    //     } = input
    //     const result = await connection.query(
    //         ''
    //     )
    // }
}