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

export class WorkerModel{
    static async getAll(){
        const [workers] = await connection.query(
            'select * from trabajador;'
        )
        return workers   
    }
    static async getById({id}){
        const [worker] = await connection.query(
            'select * from trabajador where id_trabajador = ?;', [
                id
            ]
        )
        if (worker.length === 0 ){
            return []
        }
        return worker[0]
    }
    static async create({input}) {
        const {idWorker,idPerson} = input
        const result = await connection.query(
            'INSERT INTO trabajador (id_trabajador,id_agricultor,id_persona) VALUES (NULL ,?, ? )',
            [idWorker,idPerson]
        )
        return result[0].insertId
    }
    static async delete(){
        // const {id} = req.params
        // const trabajador = await TrabajadorModel.getById({id})
        // const idPersona = trabajador.id_persona
        // await TrabajadorModel.delete({id:id})    
        // await PersonModel.delete({id:idPersona})
        // return res.json({message: 'Trabajador eliminado'})
    }
    static async getWorkersByIdFarmer({idFarmer}){
        const [farmers] = await connection.query(
            'select * from trabajador where id_agricultor=?',
            [idFarmer]
        )
        return farmers
    }
}