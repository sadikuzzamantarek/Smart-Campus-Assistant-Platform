import { Router } from "express";
import AssignmentController from "../controllers/assignment_controller.js";

const asignment_router = Router();

const assignment_controller = new AssignmentController();

asignment_router.get(
  "/get-all-assignments",
  assignment_controller.get_all_assignments,
);
asignment_router.get(
  "/get-single-assignment/:id",
  assignment_controller.get_assignment_by_id,
);
asignment_router.delete(
  "/get-single-assignment/:id",
  assignment_controller.delete_assignment,
);

export default asignment_router;
