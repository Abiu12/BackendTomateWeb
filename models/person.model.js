import mysql from 'mysql2/promise'
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
const connection = await mysql.createConnection(config);

export class PersonModel{
    static async create({ input }) {
        try {
            const {
                name,
                surname,
                secondSurname,
                phone,
                email
            } = input;
    
            const result = await connection.query(
                'INSERT INTO persona (id_persona, nombre, primer_apellido, segundo_apellido, telefono, correo_electronico, estado) VALUES (NULL, ?, ?, ?, ?, ?, ?)',
                [name, surname, secondSurname, phone, email, 'activo']
            );
    
            return result[0].insertId;
        } catch (error) {
            throw new Error("Error al crear la persona en la base de datos");
        }
    }
    
    static async getById({ idPerson }) {
        try {
            const [person] = await connection.query(
                'SELECT * FROM persona WHERE id_persona = ?;',
                [idPerson]
            );
            if (person.length === 0) {
                return [];
            }
            return person[0];
        } catch (error) {
            throw new Error("Error al obtener la persona desde la base de datos");
        }
    }
    
    static async delete({ idPerson }) {
        try {
            const result = await connection.query(
                `
                UPDATE persona
                SET estado = 'inactivo'
                WHERE id_persona = ?;
                `,
                [idPerson]
            );
            return result;
        } catch (error) {
            throw new Error("Error al eliminar la persona desde la base de datos");
        }
    }
    
    static async update({ input }) {
        try {
            const {
                idPerson,
                name,
                surname,
                secondSurname,
                phone,
                email
            } = input;
    
            await connection.query(
                `UPDATE persona
                SET nombre = ?, primer_apellido = ?, segundo_apellido = ?, telefono = ?, correo_electronico = ?
                WHERE id_persona = ?;`,
                [name, surname, secondSurname, phone, email, idPerson]
            );
        } catch (error) {
            throw new Error("Error al actualizar la persona en la base de datos");
        }
    }
    
}