import { Router } from "express";
import EventController from "../controllers/event_controller.js";
const eventRouter = new Router();
const eventController = new EventController();
eventRouter.get("/get-all-events", eventController.getAllEvents);
eventRouter.post("/create-event", eventController.createEvent);
eventRouter.get("/get-single-event/:id", eventController.getEventById);
export default eventRouter;
