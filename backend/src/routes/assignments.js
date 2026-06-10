import { Router } from "express";
import AssignmentController from "../controllers/assignment_controller.js";
import loggerMiddleware from "../middlewares/loggerMiddleware.js";

const asignment_router = Router();

const assignment_controller = new AssignmentController();

asignment_router.get(
  "/get-all-assignments",
  loggerMiddleware,
  assignment_controller.get_all_assignments,
);
asignment_router.get(
  "/get-single-assignment/:id",
  loggerMiddleware,
  assignment_controller.get_assignment_by_id,
);
asignment_router.delete(
  "/delete-assignment/:id",
  loggerMiddleware,
  assignment_controller.delete_assignment,
);
asignment_router.post(
  "/create-assignment",
  loggerMiddleware,
  assignment_controller.create_assignment,
);
asignment_router.put(
  "/update-assignment/:id",
  loggerMiddleware,
  assignment_controller.update_assignment,
);

export default asignment_router;
