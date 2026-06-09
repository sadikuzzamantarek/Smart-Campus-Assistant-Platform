import assignment_model from "../models/assignment_model.js";
import { responseReturn } from "../utils/response.js";

export default class AssignmentController {
  get_all_assignments = async (req, res) => {
    try {
      const assignments = await assignment_model.find();
      if (assignments != null)
        return responseReturn(
          res,
          assignments,
          200,
          assignments.length <= 0
            ? "No Assignment Found"
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
}
