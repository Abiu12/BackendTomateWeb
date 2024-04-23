import { Router } from "express";
import { LoginController } from "../controllers/login.controller.js";

export const LoginRouter = Router ()


LoginRouter.post('/',LoginController.login)
LoginRouter.post('/checkEmailExistence',LoginController.checkEmailExistence)
LoginRouter.post('/send_recovery_email',LoginController.sendEmail)