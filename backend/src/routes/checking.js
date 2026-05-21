import { Router } from "express";
import CheckController from "../controllers/controller_check.js";
import loggerMiddleware from "../middlewares/loggerMiddleware.js";
const checkingRouter = Router();

const check = new CheckController();
checkingRouter.get("/check", loggerMiddleware,check.checkController);

export default checkingRouter
