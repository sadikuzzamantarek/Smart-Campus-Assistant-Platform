import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["student", "teacher", "admin", "staff"],
      default: "student",
    },

    // Student‑only fields
    studentId: { type: String, unique: true, sparse: true },
    levelTerm: { type: String }, // e.g., "3rd Semester"

    // Teacher‑only fields
    department: { type: String },
    designation: { type: String }, // e.g., "Professor", "Lecturer"

    // Common additional fields
    phone: { type: String },
    address: { type: String },
    avatar: { type: String, default: "" },

    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("users", UserSchema);
