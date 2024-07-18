import { FarmerModel } from "../models/farmer.model.js";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { WorkerModel } from "../models/worker.model.js";
import bcrypt from "bcrypt";
export class FarmerController {
  static async getAll(req, res) {
    try {
      const response = await FarmerModel.getAll();
      return res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const response = await FarmerModel.getById({ idFarmer: id });
      if (response.length > 0) return res.json(response[0]);
      return res.status(404).json([]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async create(req, res) {
    try {
      const {
        name,
        surname,
        secondSurname,
        phone,
        email,
        nameUser,
        password,
        role,
      } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const idPerson = await PersonModel.create({
        input: { name, surname, secondSurname, phone, email },
      });
      if (idPerson) {
        const responseFarmer = await FarmerModel.create({ idPerson });
        const responseUser = await UserModel.create({
          input: { nameUser, password: hashPassword, idPerson, role },
        });
        if (
          responseFarmer[0].affectedRows == 1 &&
          responseUser[0].affectedRows == 1
        ) {
          return res.status(201).json({ message: "Agricultor creado" });
        }
        return res.json({
          message: "Hubo un problema al registrar al agricultor",
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async delete(req, res) {
    try {
      const { idFarmer } = req.params;
      const response = await FarmerModel.delete({ idFarmer });
      if (response)
        return res.json({ message: "El agricultor ha sido eliminado" });
      return res.status(404).json({ message: "No se encontró al agricultor" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getWorkersByIdFarmer(req, res) {
    try {
      const { idFarmer } = req.params;
      const response = await WorkerModel.getWorkersByIdFarmer({
        idFarmer,
      });
      if (response.length > 0) {
        return res.json(response);
      }
      return res
        .status(404)
        .json({ message: "No hay trabajadores registrados del agricultor" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async update(req, res) {
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
        const responseUserUpdate = await UserModel.update({
          input: { idPerson: farmer[0].id_persona, nameUser, password },
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
  static async changePassword(req, res) {
    try {
      const { idFarmer } = req.params;
      const { oldPassword, newPassword } = req.body;
      const farmer = await FarmerModel.getById({ idFarmer });
      if (farmer.length > 0) {
        const user = await UserModel.getByIdPerson({
          idPerson: farmer[0].id_persona,
        });
        if (user.length > 0) {
          const validatePassword = await bcrypt.compare(
            oldPassword,
            user[0].contrasenia
          );
          if (validatePassword) {
            const hashPassword = await bcrypt.hash(newPassword, 10);
            const response = await UserModel.changePassword({
              input: {
                newPassword: hashPassword,
                idPerson: farmer[0].id_persona,
              },
            });
            if (response[0].affectedRows == 1) {
              return res.json({ message: "La contraseña se ha cambiado" });
            }
          } else {
            return res
              .status(401)
              .json({ message: "La contraseña es incorrecta" });
          }
        }
      }
      return res.json({ message: "No se encuentra el agricultor" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getNotificationsByStatus(req, res) {
    try {
      const { idFarmer, status } = req.params;
      const response = await FarmerModel.getNotificationsByStatus({
        input: { idFarmer, status },
      });
      if (response.length > 0) {
        return res.status(200).json(response);
      }
      return res
        .status(404)
        .json({ message: "No se encontraron notificaciones" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getNameFarmers(req, res) {
    try {
      const response = await FarmerModel.getNameFarmers();
      if (response.length > 0) {
        return res.json(response);
      }
      return res.status(404).json({
        message: "No se han encontrado datos de los agricultores",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async deleteAsignGreenhouse(req, res) {
    try {
      const { idGreenhouseWorker } = req.params;
      const response = await FarmerModel.deleteAsignGreenhouse({
        idGreenhouseWorker,
      });
      if (response[0].affectedRows == 1) {
        return res
          .status(200)
          .json({ message: "La asignación ha sido eliminada" });
      }
      return res
        .status(404)
        .json({ message: "No se ha encontrado ninguna asignación" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
