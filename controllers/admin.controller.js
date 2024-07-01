import { AdminModel } from "../models/admin.model.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
export class AdminController {
  // Ya
  static async getData(req, res) {
    try {
      const response = await AdminModel.getData();
      if (response.length == 0) {
        return res.json({
          message: "No se encuentra un administrador, llamen a Dios",
        });
      }
      return res.json(response);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  // Ya
  static async update(req, res) {
    try {
      const { name, surname, secondSurname, phone, email, nameUser, password } =
        req.body;

      const response = await AdminModel.update({
        input: {
          name,
          surname,
          secondSurname,
          phone,
          email,
          nameUser,
          password,
        },
      });
      if (response) {
        return res.json({ message: "Se actualizó la informacion" });
      }
      return res.json({ message: "Hubo un problema" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const admin = await UserModel.getAdmin();
      if (admin.length > 0) {
        const validatePassword = await bcrypt.compare(
          oldPassword,
          admin[0].contrasenia
        );
        if (validatePassword) {
          const hashPassword = await bcrypt.hash(newPassword, 10);
          const response = await UserModel.changePassword({
            input: {
              newPassword: hashPassword,
              idPerson: admin[0].id_persona,
            },
          });
          if (response[0].affectedRows == 1) {
            return res
              .status(200)
              .json({ message: "La contraseña se ha cambiado" });
          }
        } else {
          return res
            .status(401)
            .json({ message: "La contraseña es incorrecta" });
        }
      } else {
        return res.status(404).json({ message: "No hay administrador" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
