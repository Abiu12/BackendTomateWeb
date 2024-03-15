import mysql from 'mysql2/promise'
import { PersonaModel } from './persona.model.js';
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class TrabajadorModel{
    static async getAll(){
        const [trabajadores] = await connection.query(
            'select * from trabajador;'
        )
        return trabajadores   
    }
    static async getById({id}){
        const [trabajador] = await connection.query(
            'select * from trabajador where id_trabajador = ?;', [
                id
            ]
        )
        if (trabajador.length === 0 ){
            return []
        }
        return trabajador[0]
    }
    static async create({input}) {
        const {idAgricultor,idPersona} = input
        const result = await connection.query(
            'INSERT INTO trabajador (id_trabajador,id_agricultor,id_persona) VALUES (NULL ,?, ? )',
            [idAgricultor,idPersona]
        )
        return result[0].insertId
    }
    static async delete(){
        const {id} = req.params
        const trabajador = await TrabajadorModel.getById({id})
        const idPersona = trabajador.id_persona
        await TrabajadorModel.delete({id:id})    
        await PersonaModel.delete({id:idPersona})
        return res.json({message: 'Trabajador eliminado'})
    }
    
}