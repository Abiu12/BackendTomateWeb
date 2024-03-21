import mysql from 'mysql2/promise'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class DiseaseModel{
    static async getAll(){
        const [diseases] = await connection.query(
            'select * from enfermedad ')
        return diseases
    }
    static async getById({idDisease}){
        const disease = await connection.query(
            'select * from enfermedad where id_enfermedad = ?',[idDisease]
        )
        return disease[0]
    }
    static async create({input}){
        const {
            name,
            nameScientific,
            recommendations,
            actions
        } = input
       
        const result = await connection.query(
            'INSERT INTO enfermedad (id_enfermedad,nombre,nombre_cientifico,recomendaciones,acciones) values (NULL,?,?,?,?)',
            [name,nameScientific,recommendations,actions]
        )
        return result[0].insertId
    }
    static async update(){}
    static async delete(){}

}