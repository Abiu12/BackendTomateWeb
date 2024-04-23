import mysql from 'mysql2/promise'
import { config as dotenvConfig } from 'dotenv';


import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const jwt = require('jsonwebtoken');

dotenvConfig();
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
const connection = await mysql.createConnection(config);

export class LoginModel {
    static async login({ input }) {
        const {
            username,
            password
        } = input
        const response = await connection.query(
            'SELECT rol FROM usuario WHERE nombre_usuario = ? AND contrasenia = ?',
            [username, password]
        );
        if (response.length > 0) {
            const rolUsuario = response[0][0].rol;
            const token = jwt.sign({ username, rolUsuario }, "Stack", {
                expiresIn: '50m'
            });
            return {response,token}
        }
    }
}