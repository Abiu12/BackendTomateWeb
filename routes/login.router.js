import { Router } from "express";
import { LoginController } from "../controllers/login.controller.js";
export const LoginRouter = Router();
LoginRouter.post("/", LoginController.login);
LoginRouter.post("/check_email_existence", LoginController.checkEmailExistence);
LoginRouter.post("/userNameExistence", LoginController.userNameExistence);
LoginRouter.post("/send_recovery_email", LoginController.sendEmail);
LoginRouter.patch("/changePassword", LoginController.changePassword);
LoginRouter.post("/getDataByUsername", LoginController.getDataByUsername);
LoginRouter.patch(
  "/registerTokenNotification",
  LoginController.registerTokenNotification
);
