import mongoose from "mongoose";
const AssignmentSchema = new mongoose.Schema({
  assignment_title: {
    type: String,
    required: true,
  },
  assignment_no: {
    type: Number,
    required: true,
  },
  coursre_code: {
    type: String,
    required: true,
    // ref:"" use ref from the course collection
  },
  course_title: {
    type: String,
    required: true,
    // ref:"" use ref from the course collection
  },
  description: {
    type: String,
    required: true,
  },
  assigned_date: {
    type: Date,
    default: Date.now(),
  },
  deadline_date: {
    type: Date,
    required: true,
  },
  modified_date: {
    type: Date,
    default: Date.now(),
  },
  level_term: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

// Create and export the model
export default mongoose.model("assignments", AssignmentSchema);
