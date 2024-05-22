import { FarmerModel } from "../models/farmer.model.js";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { WorkerModel } from "../models/worker.model.js";
export class FarmerController {
  // Ya web
  static async getAll(req, res) {
    try {
      const response = await FarmerModel.getAll();
      return res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Ya web
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
  //Ya web
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
      const idPerson = await PersonModel.create({
        input: { name, surname, secondSurname, phone, email },
      });
      if (idPerson) {
        const responseFarmer = await FarmerModel.create({ idPerson });
        const responseUser = await UserModel.create({
          input: { nameUser, password, idPerson, role },
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
  //Ya web
  static async delete(req, res) {
    try {
      const { idFarmer } = req.params;
      const farmer = await FarmerModel.getById({ idFarmer });
      if (farmer.length > 0) {
        const response = await PersonModel.delete({
          idPerson: farmer[0].id_persona,
        });
        if (response[0].affectedRows == 1) {
          return res.json({ message: "El agricultor ha sido eliminado" });
        }
      }
      return res.status(404).json({ message: "No se encontró al agricultor" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //Ya
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
  //Ya
  static async update(req, res) {
    try {
      const { idFarmer } = req.params;
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
  //Ya
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
          if (user[0].contrasenia === oldPassword) {
            const response = await UserModel.changePassword({
              input: { newPassword, idPerson: farmer[0].id_persona },
            });
            if (response[0].affectedRows == 1) {
              return res.json({ message: "La contraseña se ha cambiado" });
            }
          } else {
            return res.json({ message: "La contraseña es incorrecta" });
          }
        }
      }
      return res.json({ message: "No se encuentra el agricultor" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Ya
  static async getNotificationsByStatus(req, res) {
    try {
      const { idFarmer, status } = req.params;
      const response = await FarmerModel.getNotificationsByStatus({
        input: { idFarmer, status },
      });
      if (response.length > 0) {
        return res.json(response);
      }
      return res
        .status(404)
        .json({ message: "No se encontraron notificaciones" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Ya
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
}
