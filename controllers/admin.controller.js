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
  static async updateFarmer(req, res) {
    try {
      const { idFarmer } = req.params;
      const { name, surname, secondSurname, phone, email, nameUser, password } =
        req.body;
      const farmer = await FarmerModel.getById({ idFarmer });
      if (farmer.length > 0) {
        const responsePersonUpdate = await PersonModel.update({
          input: {
            idPerson: farmer[0].id_persona,
            name,
            surname,
            secondSurname,
            phone,
            email,
          },
        });
        const hashPassword = await bcrypt.hash(password, 10);
        const responseUserUpdate = await UserModel.update({
          input: { idPerson: farmer[0].id_persona, nameUser, hashPassword },
        });
        if (
          responsePersonUpdate[0].affectedRows == 1 &&
          responseUserUpdate[0].affectedRows == 1
        ) {
          return res.json({
            message: "Se han actualizado los datos del agricultor",
          });
        }
      }
      return res.status(400).json({ message: "No se encontró el agricultor" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async updateWorker(req, res) {
    try {
      const { idWorker } = req.params;
      const {
        idFarmer,
        name,
        surname,
        secondSurname,
        phone,
        email,
        nameUser,
        password,
      } = req.body;
      const worker = await WorkerModel.getById({ idWorker });
      if (worker.length > 0) {
        const responseWorker = await WorkerModel.update({
          input: { idWorker: worker[0].id_trabajador, idFarmer },
        });
        const responsePerson = await PersonModel.update({
          input: {
            idPerson: worker[0].id_persona,
            name,
            surname,
            secondSurname,
            phone,
            email,
          },
        });
        const hashPassword = await bcrypt.hash(password, 10);
        const responseUser = await UserModel.update({
          input: {
            idPerson: worker[0].id_persona,
            nameUser,
            hashPassword,
            role,
          },
        });
        if (
          responseWorker[0].affectedRows == 1 ||
          responsePerson[0].affectedRows == 1 ||
          responseUser[0].affectedRows == 1
        ) {
          return res.json({
            message: "Se han actualizado los datos del trabajador",
          });
        }
      }
      return res.json({ message: "No se ha encontrado el trabajador" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
