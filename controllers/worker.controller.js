import { WorkerModel } from "../models/worker.model.js";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { WorkerGreenhouseModel } from "../models/workergreenhouse.js";

export class WorkerController {
  static async getAll(req, res) {
    try {
      const workers = await WorkerModel.getAll();
      res.json(workers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { idWorker } = req.params;
      const worker = await WorkerModel.getById({ idWorker });
      if (worker.length == 0)
        return res.status(404).json({ message: "Trabajador no encontrado" });
      return res.json(worker);
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
      const { idFarmer } = req.params;
      const idPerson = await PersonModel.create({
        input: { name, surname, secondSurname, phone, email },
      });
      await WorkerModel.create({ input: { idFarmer, idPerson } });
      await UserModel.create({ input: { nameUser, password, idPerson, role } });
      res.status(201).json({ message: "Trabajador creado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { idWorker } = req.params;
      const worker = await WorkerModel.getById({ idWorker });
      await PersonModel.delete({ idPerson: worker.id_persona });
      res.json({ message: "El trabajador ha sido eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
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
        role,
      } = req.body;
      const worker = await WorkerModel.getById({ idWorker });
      const idPerson = worker.id_persona;
      await WorkerModel.update({
        input: { idWorker: worker.id_trabajador, idFarmer },
      });
      await PersonModel.update({
        input: { idPerson, name, surname, secondSurname, phone, email },
      });
      await UserModel.update({ input: { idPerson, nameUser, password, role } });
      res.json({ message: "Se han actualizado los datos del trabajador" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async assignGreenhouse(req, res) {
    try {
      const { idWorker } = req.params;
      const { idGreenhouse } = req.body;
      await WorkerGreenhouseModel.create({ input: { idWorker, idGreenhouse } });
      res.json({ message: "Invernadero asociado a trabajador" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getGreenhousesByIdWorker(req, res) {
    try {
      const { idWorker } = req.params;
      const greenhouses = await WorkerGreenhouseModel.getGreenhousesByIdWorker({
        idWorker,
      });
      return res.json(greenhouses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async changePassword(req, res) {
    try {
      const { idWorker } = req.params;
      const { oldPassword, newPassword } = req.body;
      const worker = await WorkerModel.getById({ idWorker });
      const user = await UserModel.getByIdPerson({
        idPerson: worker.id_persona,
      });
      if (user) {
        if (user.contrasenia === oldPassword) {
          await UserModel.changePassword({
            input: { newPassword, idPerson: worker.id_persona },
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
}
