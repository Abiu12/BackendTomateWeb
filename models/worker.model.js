import mysql from 'mysql2/promise'
// import { PersonModel } from './person.model.js';
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'elchidoabiu10',
    database: 'residencia'
}
const connection = await mysql.createConnection(config);

export class WorkerModel {
    static async getAll() {
        const [workers] = await connection.query(
            `
            SELECT t.id_trabajador,t.id_agricultor, p.*, u.*
            FROM trabajador t
            JOIN persona p ON t.id_persona = p.id_persona
            JOIN usuario u ON p.id_persona = u.id_persona;
            `
        )
        return workers
    }
    static async getById({ idWorker }) {
        const [worker] = await connection.query(
            'select * from trabajador where id_trabajador = ?;', [
                idWorker
        ]
        )
        if (worker.length === 0) {
            return []
        }
        return worker[0]
    }
    static async create({ input }) {
        const { idFarmer, idPerson } = input
        const result = await connection.query(
            'INSERT INTO trabajador (id_trabajador,id_agricultor,id_persona) VALUES (NULL ,?, ? )',
            [idFarmer, idPerson]
        )
        return result[0].insertId
    }
    static async delete() {
        // const {id} = req.params
        // const trabajador = await TrabajadorModel.getById({id})
        // const idPersona = trabajador.id_persona
        // await TrabajadorModel.delete({id:id})    
        // await PersonModel.delete({id:idPersona})
        // return res.json({message: 'Trabajador eliminado'})
    }
    static async update({input}){
        const {
            idWorker,
            idFarmer
        } = input
        await connection.query(
            `UPDATE trabajador
            SET id_agricultor = ?
            WHERE id_trabajador = ?
            `,
            [idFarmer,idWorker]
        )
    }
    static async getWorkersByIdFarmer({ idFarmer }) {
        const [farmers] = await connection.query(
            `
            SELECT t.id_trabajador,t.id_agricultor, p.*, u.*
            FROM trabajador t
            JOIN persona p ON t.id_persona = p.id_persona
            JOIN usuario u ON p.id_persona = u.id_persona
            WHERE id_agricultor = ?;
            `,
            [idFarmer]
        )
        return farmers
    }
}