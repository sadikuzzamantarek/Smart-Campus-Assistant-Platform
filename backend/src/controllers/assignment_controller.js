import assignment_model from "../models/assignment_model.js";
import { responseReturn } from "../utils/response.js";

export default class AssignmentController {
  //getting all the assignment
  get_all_assignments = async (req, res) => {
    try {
      const assignments = await assignment_model.find();
      if (assignments)
        return responseReturn(
          res,
          true,
          200,
          assignments.length <= 0
            ? "No Assignment Yet"
            : "Assignments fetched successfully",
          assignments,
        );
      throw new Error("There was a problem with getting all assignments");
    } catch (error) {
      return responseReturn(
        res,
        false,
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
        return responseReturn(res, false, 404, "Assignment not found");
      }

      return responseReturn(
        res,
        true,
        200,
        "Assignment fetched successfully",
        assignment,
      );
    } catch (error) {
      return responseReturn(
        res,
        false,
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
        return responseReturn(res, false, 404, "Assignment not found");
      }

      return responseReturn(res, true, 200, "Assignment deleted successfully");
    } catch (error) {
      return responseReturn(
        res,
        false,
        500,
        error.message || "Internal Server Error",
      );
    }
  };

  // creating a assignment entry
  create_assignment = async (req, res) => {
    try {
      const {
        assignment_title,
        assignment_no,
        course_code,
        course_title,
        description,
        deadline_date,
        level_term,
        status,
      } = req.body;

      // Basic validation for required fields
      if (
        !assignment_title ||
        !assignment_no ||
        !course_code ||
        !course_title ||
        !description ||
        !deadline_date ||
        !level_term
      ) {
        return responseReturn(res, false, 400, "Missing required fields");
      }
      const existingAssignmentCheck = await assignment_model.findOne({
        course_code,
        assignment_no,
      });
      if (existingAssignmentCheck) {
        return responseReturn(
          res,
          false,
          403,
          "Assignment already existed with the same number. Same course can not have multiple same assignment numbers.",
        );
      }
      const newAssignment = await assignment_model.create({
        assignment_title,
        assignment_no,
        course_code,
        course_title,
        description,
        deadline_date,
        level_term,
        status: status || "pending",
      });

      return responseReturn(
        res,
        true,
        201,
        "Assignment created successfully",
        newAssignment,
      );
    } catch (error) {
      return responseReturn(
        res,
        false,
        500,
        error.message || "Internal Server Error",
      );
    }
  };
  // Update an assignment
  update_assignment = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Prevent updating read-only or internal fields if needed
      const forbiddenUpdates = ["_id", "assigned_date", "modified_date"];
      forbiddenUpdates.forEach((field) => delete updateData[field]);

      updateData.modified_date = Date.now();
      const { course_code, assignment_no } = updateData;
      const existingAssignmentCheck = await assignment_model.findOne({
        course_code,
        assignment_no,
        _id: { $ne: id },
      });
      if (existingAssignmentCheck) {
        return responseReturn(
          res,
          false,
          403,
          "Assignment already existed with the same number. Same course can not have multiple same assignment numbers.",
        );
      }

      const updatedAssignment = await assignment_model.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true },
      );

      if (!updatedAssignment) {
        return responseReturn(res, false, 404, "Assignment not found");
      }

      return responseReturn(
        res,
        true,
        200,
        "Assignment updated successfully",
        updatedAssignment,
      );
    } catch (error) {
      return responseReturn(
        res,
        false,
        500,
        error.message || "Internal Server Error",
      );
    }
  };
}
