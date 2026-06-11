import { Router } from "express";
import CheckController from "../controllers/controller_check.js";
import { protect } from "../middlewares/authMiddleware.js";
import loggerMiddleware from "../middlewares/loggerMiddleware.js";
const checkingRouter = Router();

const check = new CheckController();
checkingRouter.get("/check", loggerMiddleware, check.checkController);
checkingRouter.get(
  "/check-protected",
  loggerMiddleware,
  protect,
  check.checkAuth,
);

export default checkingRouter;
