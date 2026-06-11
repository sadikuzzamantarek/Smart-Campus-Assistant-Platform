import { Router } from "express";
import AuthController from "../controllers/auth.js";

const authController = new AuthController();
const authRouter = new Router();
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/forgot-password", authController.login);
authRouter.post("/reset-password", authController.login);
export default authRouter;
