import { Router } from "express";
import NoticeController from "../controllers/notice_controller.js";
import loggerMiddleware from "../middlewares/loggerMiddleware.js";
import {protect} from "../middlewares/authMiddleware.js";

const noticeRouter = Router();
const _notice = new NoticeController();
noticeRouter.get("/notice", loggerMiddleware, _notice.getAllNotices);

noticeRouter.get("/notice/:id", loggerMiddleware, _notice.getNoticeById);

noticeRouter.post("/notice", loggerMiddleware, protect, _notice.createNotice);

noticeRouter.put(
  "/notice/:id",
  loggerMiddleware,
  protect,
  _notice.updateNotice,
);

noticeRouter.delete(
  "/notice/:id",
  loggerMiddleware,
  protect,
  _notice.deleteNotice,
);

export default noticeRouter;
