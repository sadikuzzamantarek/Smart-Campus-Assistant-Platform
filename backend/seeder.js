import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
// Load environment variables
dotenv.config();
import Assignment from "./src/models/assignment_model.js";

// Sample data for randomization
const COURSES = [
  { code: "CSE101", title: "Introduction to Computer Science" },
  { code: "CSE201", title: "Data Structures and Algorithms" },
  { code: "CSE301", title: "Database Management Systems" },
  { code: "CSE401", title: "Operating Systems" },
  { code: "CSE501", title: "Software Engineering" },
  { code: "MAT101", title: "Calculus I" },
  { code: "MAT201", title: "Linear Algebra" },
  { code: "PHY101", title: "Physics I" },
  { code: "ENG101", title: "English Composition" },
  { code: "ECE201", title: "Digital Logic Design" },
  { code: "BUS301", title: "Business Analytics" },
  { code: "DS201", title: "Data Science Fundamentals" },
  { code: "AI401", title: "Artificial Intelligence" },
  { code: "ML401", title: "Machine Learning" },
  { code: "CYP301", title: "Cybersecurity Basics" },
];

const LEVEL_TERMS = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
];

const ASSIGNMENT_TITLES = [
  "Research Paper",
  "Programming Project",
  "Problem Set",
  "Case Study Analysis",
  "Literature Review",
  "Lab Report",
  "Group Presentation",
  "Code Implementation",
  "System Design Document",
  "Algorithm Analysis",
  "Database Design",
  "Network Configuration",
  "Security Audit Report",
  "Data Visualization",
  "Statistical Analysis",
  "Web Development Project",
  "Mobile App Development",
  "API Integration",
  "Testing and Debugging",
  "Documentation",
];

const DESCRIPTIONS = [
  "Complete all problems and submit your solutions",
  "Write a detailed analysis of the given case study",
  "Implement the required functionality with proper documentation",
  "Research and present your findings on the topic",
  "Create a comprehensive report with examples",
  "Design and implement a working prototype",
  "Analyze the provided dataset and present insights",
  "Write test cases and perform thorough testing",
  "Prepare a presentation and submit slides",
  "Create UML diagrams and documentation",
  "Optimize the given code for better performance",
  "Review and refactor the existing codebase",
  "Conduct a peer review of three assignments",
  "Create a video tutorial explaining the concept",
  "Build an interactive dashboard",
];

// Helper function to get random item from array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to get random date between two dates
const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

// Helper function to generate random assignment number
const randomAssignmentNo = () => Math.floor(Math.random() * 20) + 1; // 1-20

// Helper function to generate random status
const randomStatus = () => {
  const statuses = ["pending", "submitted", "graded", "late"];
  const weights = [0.4, 0.2, 0.15, 0.15, 0.1]; // 40% pending, 20% submitted, etc.
  const random = Math.random();
  let cumulative = 0;
  for (let i = 0; i < statuses.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) return statuses[i];
  }
  return "pending";
};

// Generate random assignments
const generateAssignments = (count = 50) => {
  const assignments = [];
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  const sixMonthsFromNow = new Date(currentDate);
  sixMonthsFromNow.setMonth(currentDate.getMonth() + 6);

  for (let i = 0; i < count; i++) {
    const course = randomItem(COURSES);
    const assignedDate = randomDate(oneYearAgo, currentDate);
    const deadlineDate = randomDate(assignedDate, sixMonthsFromNow);
    const modifiedDate = randomDate(
      assignedDate,
      deadlineDate < currentDate ? deadlineDate : currentDate,
    );

    const assignment = {
      assignment_title: `${randomItem(ASSIGNMENT_TITLES)} - ${randomItem(COURSES).code}`,
      assignment_no: randomAssignmentNo(),
      course_code: course.code, // Note: There's a typo in your schema (course_code instead of course_code)
      course_title: course.title,
      description: `${randomItem(DESCRIPTIONS)}. ${Math.random() > 0.5 ? "Additional requirements: " + randomItem(DESCRIPTIONS).toLowerCase() + "." : ""}`,
      assigned_date: assignedDate,
      deadline_date: deadlineDate,
      modified_date: modifiedDate,
      level_term: randomItem(LEVEL_TERMS),
      status: randomStatus(),
    };

    assignments.push(assignment);
  }

  return assignments;
};

// Seeder function
const seedDatabase = async () => {
  console.log("sadik");

  try {
    // Connect to MongoDB
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/smart_campus";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Delete existing assignments (optional)
    await Assignment.deleteMany({});
    console.log("Deleted existing assignments");

    // Generate assignments
    const assignments = generateAssignments(55); // Generate 55 assignments
    console.log(`Generated ${assignments.length} assignments`);

    // Insert assignments
    const result = await Assignment.insertMany(assignments);
    console.log(
      `Successfully seeded ${result.length} assignments to the database`,
    );

    // Display sample of inserted data
    console.log("\nSample of inserted assignments:");
    result.slice(0, 5).forEach((assignment, index) => {
      console.log(`\n${index + 1}. ${assignment.assignment_title}`);
      console.log(
        `   Course: ${assignment.course_code} - ${assignment.course_title}`,
      );
      console.log(`   Deadline: ${assignment.deadline_date.toDateString()}`);
      console.log(`   Status: ${assignment.status}`);
    });
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  }
};

// Run the seeder if this file is executed directly
// Run the seeder when this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("Starting seeder...");
  seedDatabase();
}
// Export for use in other scripts
export { generateAssignments, seedDatabase };
