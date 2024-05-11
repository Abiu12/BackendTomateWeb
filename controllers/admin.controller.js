import { AdminModel } from "../models/admin.model.js";

export class AdminController {
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
}
