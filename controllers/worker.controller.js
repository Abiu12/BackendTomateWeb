import { WorkerModel } from "../models/worker.model.js";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { WorkerGreenhouseModel } from "../models/workergreenhouse.js";

export class WorkerController {
  // ya web
  static async getAll(req, res) {
    try {
      const response = await WorkerModel.getAll();
      if (response.length > 0) {
        return res.json(response);
      }
      return res.status(404).json({ message: "No hay trabajadores" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // ya web
  static async getById(req, res) {
    try {
      const { idWorker } = req.params;
      const response = await WorkerModel.getById({ idWorker });
      if (response.length == 0)
        return res.status(404).json({ message: "Trabajador no encontrado" });
      return res.json(response[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // ya
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
      if (idPerson) {
        const responseWorker = await WorkerModel.create({
          input: { idFarmer, idPerson },
        });
        const responseUser = await UserModel.create({
          input: { nameUser, password, idPerson, role },
        });
        if (
          responseWorker[0].affectedRows === 1 &&
          responseUser[0].affectedRows == 1
        ) {
          return res.status(201).json({ message: "Trabajador creado" });
        }
      }
      return res.status(400).json({ message: "Hubo un problema" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //ya
  static async delete(req, res) {
    try {
      const { idWorker } = req.params;
      const worker = await WorkerModel.getById({ idWorker });
      if (worker.length > 0) {
        const response = await PersonModel.delete({
          idPerson: worker[0].id_persona,
        });
        if (response[0].affectedRows == 1) {
          return res.json({ message: "El trabajador ha sido eliminado" });
        }
      }
      return res.status(404).json({ message: "No se encontró al trabajador" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //ya
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
        const responseUser = await UserModel.update({
          input: { idPerson: worker[0].id_persona, nameUser, password, role },
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
  //ya
  static async assignGreenhouse(req, res) {
    try {
      const { idWorker } = req.params;
      const { idGreenhouse } = req.body;
      const response = await WorkerGreenhouseModel.create({
        input: { idWorker, idGreenhouse },
      });
      if (response[0].affectedRows == 1) {
        return res.json({ message: "Invernadero asociado a trabajador" });
      }
      return res.json({ message: "No se encontró al trabajador" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //ya
  static async getGreenhousesByIdWorker(req, res) {
    try {
      const { idWorker } = req.params;
      const response = await WorkerGreenhouseModel.getGreenhousesByIdWorker({
        idWorker,
      });
      if (response.length > 0) {
        return res.json(response);
      }
      return res.json({ message: "El trabajador no tiene invernaderos" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // ya
  static async changePassword(req, res) {
    try {
      const { idWorker } = req.params;
      const { oldPassword, newPassword } = req.body;
      const worker = await WorkerModel.getById({ idWorker });
      const user = await UserModel.getByIdPerson({
        idPerson: worker.id_persona,
      });
      if (worker.length > 0) {
        if (user.length > 0) {
          if (user[0].contrasenia === oldPassword) {
            await UserModel.changePassword({
              input: { newPassword, idPerson: worker[0].id_persona },
            });
            return res.json({ message: "La contraseña se ha cambiado" });
          } else {
            return res.json({ message: "La contraseña es incorrecta" });
          }
        }
        return res.json({ message: "No existe el usuario" });
      }
      return res.json({ message: "No existe el trabajador" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //ya
  static async getNotificationsByStatus(req, res) {
    try {
      const { idWorker, status } = req.params;
      const response = await WorkerModel.getNotificationsByStatus({
        input: { idWorker, status },
      });
      if (response.length > 0) {
        return res.status(200).json(response);
      }
      return res.status(404).json({ message: "No hay notificaciones" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async deleteAsignGreenhouse(req, res) {
    try {
      const { idWorkerGreenhouse } = req.params;
      const response = await WorkerGreenhouseModel.deleteAsignGreenhouse({
        idWorkerGreenhouse,
      });
      if (response[0].affectedRows == 1) {
        return res.status(200).json({ message: "Asignación eliminada" });
      }
      return res
        .status(404)
        .json({ message: "No se ha encontrado la asignación" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async existsAsignGreenhouse(req, res) {
    try {
      const { idWorker, idGreenhouse } = req.params;
      const response = await WorkerGreenhouseModel.existsAsignGreenhouse({
        idWorker,
        idGreenhouse,
      });
      if (response.length > 0) {
        return res.status(200).json({ exists: true });
      }
      return res.status(404).json({ exists: false });
    } catch (error) {}
  }
}
