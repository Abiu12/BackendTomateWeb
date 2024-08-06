import { LoginModel } from "../models/login.model.js";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { require } from "../utils/require.js";
const nodemailer = require("nodemailer");
import bcrypt from "bcrypt";
export class LoginController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const { response, token } = await LoginModel.login({
        input: { username, password },
      });
      if (response) {
        const rol = response[0][0].rol;
        return res.status(200).json({ rol, token });
      }
      res.status(400).json({ message: "Error en las credenciales" });
    } catch (error) {
      res.status(500).json({ error: error.mesagge });
    }
  }
  static async checkEmailExistence(req, res) {
    try {
      const { email } = req.body;
      const response = await LoginModel.checkEmailExistence({
        input: { email },
      });
      if (response.length > 0) {
        return res.status(200).json({ exists: true });
      }
      res.status(200).json({ exists: false });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async userNameExistence(req, res) {
    try {
      const { userName } = req.body;
      const response = await LoginModel.userNameExistence({ userName });
      if (response.length > 0) {
        return res.json({ exists: true });
      }
      return res.json({ exists: false });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static sendEmail(req, res) {
    try {
      const { recipient_email, OTP } = req.body;
      const response = new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
          },
        });

        const mailConfig = {
          from: process.env.MY_EMAIL,
          to: recipient_email,
          subject: "Recuperación de Contraseña - Tomi-Plagas y Enfermedades",
          html: `<!DOCTYPE html>
            <html lang="es">
            <head>
              <meta charset="UTF-8">
              <title>Correo de Recuperación de Contraseña - Tomi-Plagas y Enfermedades</title>
              <style>
                body {
                  font-family: Helvetica, Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  min-width: 1000px;
                  overflow: auto;
                  line-height: 2;
                }
                .container {
                  margin: 50px auto;
                  width: 70%;
                  padding: 20px 0;
                }
                .header {
                  border-bottom: 1px solid #eee;
                }
                .header a {
                  font-size: 1.4em;
                  color: #c62426;
                  text-decoration: none;
                  font-weight: 600;
                }
                .content {
                  font-size: 1.1em;
                }
                .code {
                  background: #c62426;
                  margin: 20px auto;
                  width: max-content;
                  padding: 10px;
                  color: #fff;
                  border-radius: 4px;
                  font-size: 1.5em;
                  font-weight: bold;
                }
                .footer {
                  font-size: 0.9em;
                }
                .disclaimer {
                  border-top: 1px solid #eee;
                  padding: 8px 0;
                  color: #aaa;
                  font-size: 0.8em;
                  line-height: 1;
                  font-weight: 300;
                  text-align: right;
                }
                .disclaimer p {
                  margin: 0;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <a href="#">Recuperación de contraseña</a>
                </div>
                <p class="content">Gracias por elegir Tomi-Plagas y Enfermedades              
                . Utiliza el siguiente código para completar tu proceso de recuperación de contraseña. El código es válido por 2 minutos:</p>
                <div class="code">${OTP}</div>
                <p class="content">Por tu seguridad, no compartas este código con nadie.</p>
                <p class="footer">Saludos,<br />El equipo de Tomi-Plagas y Enfermedades</p>
                <hr class="disclaimer-border" />
                <div class="disclaimer">
                  <p>Tomi-Plagas y Enfermedades</p>
                  <p>Avenida Ing. Víctor Bravo Ahuja No. 125 Esquina Calzada Tecnológico, C.P. 68030.</p>
                  <p>Oaxaca de Juárez, México</p>
                </div>
                <div style="color: #fff; font-size: 0.1em;">
                  &nbsp;<!-- Adding non-breaking space to avoid email clients hiding content -->
                </div>
              </div>
            </body>
            </html>`,
        };

        transporter.sendMail(mailConfig, function (error, info) {});
      });
      return res.status(200).json({ message: "Email correctamente enviado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async changePassword(req, res) {
    try {
      const { email, newPassword } = req.body;
      const person = await PersonModel.getByEmail({ email });
      if (person.length === 0) {
        return res.status(404).json({
          message: "No existe un usuario asociado a ese email",
        });
      } else {
        const hashPassword = await bcrypt.hash(newPassword, 10);
        const response = await UserModel.changePassword({
          input: { idPerson: person[0].id_persona, newPassword: hashPassword },
        });
        if (response[0].affectedRows == 1) {
          return res.json({
            message: "Se ha cambiado la contraseña correctamente",
          });
        } else {
          return res.status(400).json({
            message: "Ah ocurrido un error al cambiar la contraseña",
          });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getDataByUsername(req, res) {
    try {
      const { username, role } = req.body;
      const response = await LoginModel.getDataByUsername({
        input: { username, role },
      });
      if (response.length > 0) return res.json(response[0]);
      return res
        .status(404)
        .json({ message: "No existen datos de este usuario" });
    } catch (error) {
      return res.send(500).json({ error: error.message });
    }
  }
  static async registerTokenNotification(req, res) {
    try {
      const { userName, token } = req.body;
      const response = await UserModel.registerTokenNotification({
        input: { userName, token },
      });
      if (response) return res.status(200).json({ mesagge: true });
      return res.status(400).json({ mesagge: false });
    } catch (error) {
      res.status(500).json({ error: error.mesagge });
    }
  }
}
