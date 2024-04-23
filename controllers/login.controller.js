import { LoginModel } from "../models/login.model.js";


export class LoginController {
    static async login(req, res) {
        const { username, password } = req.body;
        const {response,token} = await LoginModel.login({input:{username,password}})
        const rol = response[0][0].rol
        res.json({rol,token})
    }
}