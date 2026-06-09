import assignment_model from "../models/assignment_model.js";

export default class AssignmentController {
  get_all_assignments = async (req, res) => {
    try {
      const assignments = await assignment_model.find();
      console.log(assignments)
    } catch (error) {
      console.log(error);
    }

    // res.send("hello")
  };
}
