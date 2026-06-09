import assignment_model from "../models/assignment_model.js";
import { responseReturn } from "../utils/response.js";

export default class AssignmentController {
  //getting all the assignment
  get_all_assignments = async (req, res) => {
    try {
      const assignments = await assignment_model.find();
      if (assignments != null)
        return responseReturn(
          res,
          assignments,
          200,
          assignments.length <= 0
            ? "No Assignment Yet"
            : "Assignments fetched successfully",
        );
      throw new Error("There was a problem with getting all assignments");
    } catch (error) {
      return responseReturn(
        res,
        null,
        500,
        error.message || "Internal Server Error",
      );
      console.log(error);
    }
  };
  //getting a single assignment by their id
  get_assignment_by_id = async (req, res) => {
    try {
      const { id } = req.params;

      const assignment = await assignment_model.findById(id);

      if (!assignment) {
        return responseReturn(res, null, 404, "Assignment not found");
      }

      return responseReturn(
        res,
        assignment,
        200,
        "Assignment fetched successfully",
      );
    } catch (error) {
      return responseReturn(
        res,
        null,
        500,
        error.message || "Internal Server Error",
      );
    }
  };
  // Delete an assignment
  delete_assignment = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAssignment = await assignment_model.findByIdAndDelete(id);

      if (!deletedAssignment) {
        return responseReturn(res, null, 404, "Assignment not found");
      }

      return responseReturn(res, null, 200, "Assignment deleted successfully");
    } catch (error) {
      return responseReturn(
        res,
        null,
        500,
        error.message || "Internal Server Error",
      );
    }
  };
}
