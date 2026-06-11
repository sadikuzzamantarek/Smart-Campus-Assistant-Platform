import { Router } from "express";
import EventController from "../controllers/event_controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import loggerMiddleware from "../middlewares/loggerMiddleware.js";
const eventRouter = new Router();
const eventController = new EventController();
eventRouter.get(
  "/get-all-events",
  loggerMiddleware,

  eventController.getAllEvents,
);
eventRouter.post(
  "/create-event",
  protect,
  loggerMiddleware,
  eventController.createEvent,
);
eventRouter.get(
  "/get-single-event/:id",
  loggerMiddleware,
  eventController.getEventById,
);
eventRouter.put(
  "/update-event/:id",
  loggerMiddleware,
  protect,
  eventController.updateEvent,
);
eventRouter.delete(
  "/delete-event/:id",
  loggerMiddleware,
  protect,
  eventController.deleteEvent,
);
export default eventRouter;
