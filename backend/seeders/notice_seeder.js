import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

import Notice from "../src/models/notice.js"; // Adjust path as needed

// Sample data for randomization
const ORIGINS = [
  "IT Department",
  "HR Department",
  "Academic Affairs",
  "Registrar's Office",
  "Student Affairs",
  "Library Services",
  "Security Office",
  "Maintenance Department",
  "Finance Department",
  "Research Office",
  "International Student Office",
  "Career Services",
  "Sports Department",
  "Cultural Committee",
  "Examination Department",
];

const NOTICE_TITLES = [
  "System Maintenance",
  "Holiday Schedule Announcement",
  "New Policy Implementation",
  "Important Deadline Reminder",
  "Campus Closure Notice",
  "Event Registration Open",
  "Scholarship Opportunity",
  "Library Hours Update",
  "Faculty Meeting Schedule",
  "Exam Schedule Released",
  "Result Publication Date",
  "Workshop Registration",
  "Security Alert",
  "Infrastructure Update",
  "Software Upgrade Notice",
  "Data Privacy Update",
  "Emergency Protocol",
  "New Service Launch",
  "Parking Regulations Change",
  "Canteen Menu Update",
  "Guest Lecture Announcement",
  "Conference Call for Papers",
  "Internship Opportunities",
  "Academic Calendar Update",
  "Fee Payment Deadline",
];

const CONTENT_TEMPLATES = [
  "This is to inform all students and faculty that {details}. Please take necessary actions accordingly.",
  "Attention all: {details} For more information, contact the concerned department.",
  "Important announcement regarding {details}. Your cooperation is appreciated.",
  "Please be advised that {details}. We apologize for any inconvenience caused.",
  "This notice serves to inform everyone that {details}. Thank you for your understanding.",
  "URGENT: {details} Immediate action is required.",
  "REMINDER: {details} Please comply before the deadline.",
  "UPDATE: {details} Visit the office for further details.",
  "NOTIFICATION: {details} Spread the word to concerned individuals.",
  "IMPORTANT: {details} Non-compliance may result in consequences.",
];

const TAG_OPTIONS = [
  "urgent",
  "important",
  "announcement",
  "reminder",
  "update",
  "deadline",
  "event",
  "maintenance",
  "academic",
  "administrative",
  "holiday",
  "security",
  "policy",
  "opportunity",
  "schedule",
  "result",
  "registration",
  "workshop",
  "seminar",
  "exam",
];

// Helper function to get random item from array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to get random number of items from array (for tags)
const randomTags = (arr, min = 1, max = 4) => {
  const numTags = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, numTags);
};

// Helper function to get random date between two dates
const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

// Helper function to generate random content
const generateContent = () => {
  const template = randomItem(CONTENT_TEMPLATES);
  const details = [
    "the system will undergo scheduled maintenance on December 15th from 2AM to 6AM",
    "the campus will remain closed on December 25th for Christmas celebrations",
    "all students must submit their assignments by December 20th",
    "the library hours have been extended during exam week",
    "a new scholarship program is now available for eligible students",
    "the examination schedule has been published on the portal",
    "there will be a mandatory meeting for all faculty members",
    "the deadline for fee submission has been extended to January 10th",
    "a workshop on AI and Machine Learning will be held next week",
    "the results for final term examinations will be announced on Friday",
    "all buildings will be closed for maintenance during winter break",
    "new security protocols will be implemented from next month",
    "the canteen will introduce a new menu from December 1st",
    "guest lecture by industry expert scheduled for December 18th",
    "internship opportunities available at various companies",
    "the sports complex will remain open until 10 PM during exams",
  ][Math.floor(Math.random() * 16)];

  return template.replace("{details}", details);
};

// Generate random notices
const generateNotices = (count = 50) => {
  const notices = [];
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  const nextYear = new Date(currentDate);
  nextYear.setFullYear(currentDate.getFullYear() + 1);

  for (let i = 0; i < count; i++) {
    const modifiedDate = randomDate(oneYearAgo, currentDate);
    const title = randomItem(NOTICE_TITLES);

    const notice = {
      title: title,
      tags: randomTags(TAG_OPTIONS),
      modified: modifiedDate,
      content: generateContent(),
      origin: randomItem(ORIGINS),
    };

    notices.push(notice);
  }

  return notices;
};

// Seeder function
const seedDatabase = async () => {
  console.log("Starting Notice Seeder...");

  try {
    // Connect to MongoDB
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/smart_campus";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // Delete existing notices (optional)
    const deleted = await Notice.deleteMany({});
    console.log(`Deleted ${deleted.deletedCount} existing notices`);

    // Generate notices
    const notices = generateNotices(55); // Generate 55 notices
    console.log(`Generated ${notices.length} notices`);

    // Insert notices
    const result = await Notice.insertMany(notices);
    console.log(`Successfully seeded ${result.length} notices to the database`);

    // Display sample of inserted data
    console.log("\n📋 Sample of inserted notices:");
    result.slice(0, 5).forEach((notice, index) => {
      console.log(`\n${index + 1}. ${notice.title}`);
      console.log(`   Tags: ${notice.tags?.join(", ") || "none"}`);
      console.log(`   Origin: ${notice.origin}`);
      console.log(`   Modified: ${notice.modified.toLocaleDateString()}`);
      console.log(`   Content Preview: ${notice.content.substring(0, 80)}...`);
    });

    // Display statistics
    console.log("\n📊 Seeding Statistics:");
    console.log(`   Total Notices: ${result.length}`);
    console.log(
      `   Unique Origins: ${new Set(result.map((n) => n.origin)).size}`,
    );
    console.log(
      `   Date Range: ${result[0]?.modified.toLocaleDateString()} to ${result[result.length - 1]?.modified.toLocaleDateString()}`,
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
};

// Run the seeder when this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("🚀 Starting Notice Seeder...");
  seedDatabase();
}

// Export for use in other scripts
export { generateNotices, seedDatabase };
