import { Router } from "express";
import AssignmentController from "../controllers/assignment_controller.js";

const asignment_router = Router();

const assignment_controller = new AssignmentController();

asignment_router.get(
  "/get-all-assignment",
  assignment_controller.get_all_assignments,
);

export default asignment_router;
