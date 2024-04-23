import { LoginModel } from "../models/login.model.js";
import { require } from "../utils/require.js";
const nodemailer = require('nodemailer');
export class LoginController {
    static async login(req, res) {
        const { username, password } = req.body;
        const { response, token } = await LoginModel.login({ input: { username, password } })
        if (response) {
            const rol = response[0][0].rol
            return res.json({ rol, token })
        }
        res.json({ message: "Error en las credenciales" })

    }
    static async checkEmailExistence(req, res) {
        const { email } = req.body
        const response = await LoginModel.checkEmailExistence({ input: { email } })
        if (response[0].length > 0) {
            return res.json({ exists: true })
        }
        res.json({ exists: false });
    }
    static sendEmail(req,res) {
        const {recipient_email,OTP} = req.body
        const response = new Promise((resolve, reject) => {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MY_EMAIL,
              pass: process.env.MY_PASSWORD,
            },
          });
          
          const mailConfig = {
            from: process.env.MY_EMAIL,
            to: recipient_email,
            subject: 'Recuperación de Contraseña - NeuroPlagas',
            html: `<!DOCTYPE html>
          <html lang="es" >
          <head>
            <meta charset="UTF-8">
            <title>Correo de Recuperación de Contraseña - NeuroPlagas</title>
          </head>
          <body>
          <div style="font-family: Helvetica, Arial, sans-serif; min-width:1000px; overflow:auto; line-height:2">
            <div style="margin:50px auto; width:70%; padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="#" style="font-size:1.4em; color: #c62426; text-decoration:none; font-weight:600">NeuroPlagas</a>
              </div>
              <p style="font-size:1.1em">¡Hola!</p>
              <p>Gracias por elegir NeuroPlagas. Utiliza el siguiente código para completar tu proceso de recuperación de contraseña. El código es válido por 5 minutos:</p>
              <h2 style="background: #c62426; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${OTP}</h2>
              <p style="font-size:0.9em;">Saludos,<br />El equipo de NeuroPlagas</p>
              <hr style="border:none; border-top:1px solid #eee" />
              <div style="float:right; padding:8px 0; color:#aaa; font-size:0.8em; line-height:1; font-weight:300">
                <p>NeuroPlagas Inc</p>
                <p>Dirección de la empresa</p>
                <p>Ciudad, País</p>
              </div>
            </div>
          </div>
          </body>
          </html>`,
          };
          
          transporter.sendMail(mailConfig, function (error, info) {
            if (error) {
              console.log(error);
              return reject({ message: 'An error has occurred' });
            }
            return resolve({ message: 'Email sent successfully' });
          });
        });
        return res.json({message:response.message})
    }
}