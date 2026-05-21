
//this is a basic model structure for demo purpose
import mongoose from "mongoose";

const CheckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

// Create and export the model
export default mongoose.model("check", CheckSchema);