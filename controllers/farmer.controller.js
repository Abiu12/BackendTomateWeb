import { FarmerModel } from "../models/farmer.model.js";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { WorkerModel } from "../models/worker.model.js";
export class FarmerController {
  static async getAll(req, res) {
    try {
      const farmers = await FarmerModel.getAll();
      res.json(farmers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const farmer = await FarmerModel.getById({ idFarmer: id });
      if (farmer) return res.json(farmer);
      return res.status(404).json({ message: "Agricultor no encontrado" });
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
      const idPerson = await PersonModel.create({
        input: { name, surname, secondSurname, phone, email },
      });
      await FarmerModel.create({ idPerson });
      await UserModel.create({ input: { nameUser, password, idPerson, role } });
      res.status(201).json({ message: "Agricultor creado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { idFarmer } = req.params;
      const farmer = await FarmerModel.getById({ idFarmer });
      await PersonModel.delete({ idPerson: farmer.id_persona });
      res.json({ message: "El agricultor ha sido eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getWorkersByIdFarmer(req, res) {
    try {
      const { idFarmer } = req.params;
      const workerByFarmer = await WorkerModel.getWorkersByIdFarmer({
        idFarmer,
      });
      res.json(workerByFarmer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

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
      console.log(req.body);
      const farmer = await FarmerModel.getById({ idFarmer });
      const idPerson = farmer.id_persona;
      await PersonModel.update({
        input: { idPerson, name, surname, secondSurname, phone, email },
      });
      await UserModel.update({ input: { idPerson, nameUser, password } });
      res.json({ message: "Se han actualizado los datos del agricultor" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async changePassword(req, res) {
    try {
      const { idFarmer } = req.params;
      const { oldPassword, newPassword } = req.body;
      const farmer = await FarmerModel.getById({ idFarmer });
      const user = await UserModel.getByIdPerson({
        idPerson: farmer.id_persona,
      });
      if (user) {
        if (user.contrasenia === oldPassword) {
          await UserModel.changePassword({
            input: { newPassword, idPerson: farmer.id_persona },
          });
          return res.json({ message: "La contraseña se ha cambiado" });
        } else {
          return res.json({ message: "La contraseña es incorrecta" });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getNotificationsByStatus(req, res) {
    try {
      const { idFarmer, status } = req.params;
      const notifications = await FarmerModel.getNotificationsByStatus({
        input: { idFarmer, status },
      });
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getNameFarmers(req, res) {
    try {
      const response = await FarmerModel.getNameFarmers();
      if (response[0].length > 0) {
        return res.json(response[0]);
      }
      return res.json({
        message: "No se han encontrado datos de los agricultores",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
