import { Router } from "express";
import { LoginController } from "../controllers/login.controller.js";

export const LoginRouter = Router ()


LoginRouter.post('/',LoginController.login)