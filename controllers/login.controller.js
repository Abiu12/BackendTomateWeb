import { LoginModel } from "../models/login.model.js";


export class LoginController {
    static async login(req, res) {
        const { username, password } = req.body;
        const { response, token } = await LoginModel.login({ input: { username, password } })
        if (response) {
            const rol = response[0][0].rol
            return res.json({ rol, token })
        }
        res.json({message: "Error en las credenciales"})

    }
}