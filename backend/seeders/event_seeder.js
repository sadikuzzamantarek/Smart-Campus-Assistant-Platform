import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import Event from "../src/models/event_model.js";

dotenv.config();

// Sample data
const EVENT_TITLES = [
  "Tech Conference 2025",
  "AI Symposium",
  "Web Development Workshop",
  "Hackathon 2025",
  "Data Science Bootcamp",
  "Cybersecurity Summit",
  "Cloud Computing Expo",
  "Robotics Competition",
  "Startup Pitch Day",
  "Research Symposium",
  "Career Fair",
  "Alumni Meetup",
  "Cultural Festival",
  "Sports Tournament",
  "Guest Lecture Series",
  "Code Sprint",
  "Blockchain Workshop",
  "UI/UX Designathon",
  "Open Source Contribution Day",
  "Networking Night",
];

const CATEGORIES = [
  "Conference",
  "Workshop",
  "Hackathon",
  "Seminar",
  "Competition",
  "Social",
  "Career",
  "Academic",
  "Technical",
  "Non-Technical",
];

const ORIGINS = [
  "Department of CSE",
  "University Administration",
  "Student Affairs",
  "IEEE Student Branch",
  "ACM Student Chapter",
  "Programming Club",
  "Robotics Club",
  "Entrepreneurship Cell",
  "Cultural Committee",
  "Sports Board",
  "External Organization",
  "Alumni Association",
];

const STATUSES = ["running", "closed"];

// Helper functions
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// Generate events
const generateEvents = (count = 50) => {
  const events = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  const oneYearFromNow = new Date(now);
  oneYearFromNow.setFullYear(now.getFullYear() + 1);

  for (let i = 0; i < count; i++) {
    // Generate realistic dates: registrationDeadline <= eventDate <= eventEndDate
    const eventDate = randomDate(sixMonthsAgo, oneYearFromNow);
    const registrationDeadline = randomDate(sixMonthsAgo, eventDate);
    const eventEndDate = randomDate(
      eventDate,
      new Date(eventDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    ); // max 7 days later

    // Determine status based on current date
    let status;
    if (now < registrationDeadline) status = "upcoming";
    else if (now >= eventDate && now <= eventEndDate) status = "running";
    else status = "closed";

    events.push({
      title: `${randomItem(EVENT_TITLES)} ${Math.floor(Math.random() * 100) + 1}`,
      category: randomItem(CATEGORIES),
      origin: randomItem(ORIGINS),
      eventDate,
      registrationDeadline,
      eventEndDate,
      createdAt: randomDate(sixMonthsAgo, now),
      modifiedAt: new Date(),
      status,
    });
  }
  return events;
};

// Seeder function
const seedDatabase = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/smart_campus";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    await Event.deleteMany({});
    console.log("Deleted existing events");

    const events = generateEvents(55);
    const result = await Event.insertMany(events);
    console.log(`Successfully seeded ${result.length} events`);

    console.log("\nSample events:");
    result.slice(0, 5).forEach((event, idx) => {
      console.log(`\n${idx + 1}. ${event.title}`);
      console.log(`   Category: ${event.category} | Origin: ${event.origin}`);
      console.log(`   Event Date: ${event.eventDate.toDateString()}`);
      console.log(`   Status: ${event.status}`);
    });
  } catch (error) {
    console.error("Error seeding events:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  }
};

// Run if executed directly (cross-platform)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDatabase();
}

export { generateEvents, seedDatabase };
