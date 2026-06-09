export const DEMO_USERS = [
  {
    studentId: "2024001",
    password: "student123",
    name: "Avishek Rahul",
    department: "Computer Science & Engineering",
    departmentShort: "CSE",
    semester: "6",
    email: "avishek.rahul@baust.edu.bd",
    role: "student",
  },
  {
    studentId: "2024002",
    password: "student123",
    name: "Fatima Khan",
    department: "Electrical & Electronic Engineering",
    departmentShort: "EEE",
    semester: "4",
    email: "fatima.khan@baust.edu.bd",
    role: "student",
  },
];

export const NOTICES = [
  {
    id: 1,
    title: "The Title of the Notice",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    date: "22 May 2026",
    office: "Register Office",
    tags: ["Academic", "Administration", "Events", "Sports", "Urgent"],
  },
  {
    id: 2,
    title: "Mid-Term Exam Schedule Published",
    description:
      "The mid-term examination schedule for Spring 2026 has been published. All students are advised to check the department notice board and prepare accordingly.",
    date: "18 May 2026",
    office: "Academic Section",
    tags: ["Academic", "Urgent"],
  },
  {
    id: 3,
    title: "Library Extended Hours During Exam Week",
    description:
      "Central library will remain open until 10 PM during exam week to support students with extended study hours and resource access.",
    date: "15 May 2026",
    office: "Library Office",
    tags: ["Academic", "Administration"],
  },
  {
    id: 4,
    title: "Annual Sports Week Registration Open",
    description:
      "Registration for the annual sports week is now open. Students can register through the sports club office before the deadline.",
    date: "10 May 2026",
    office: "Sports Club",
    tags: ["Sports", "Events"],
  },
];

export const EVENTS = [
  {
    id: 1,
    title: "Tech Fest 2026",
    date: "29 May",
    status: "upcoming",
    statusLabel: "Due tomorrow",
    subject: "Database Systems",
    instructor: "Dr. Karim",
    description:
      "Annual technology festival with hackathon, robotics competition, and startup showcase at the main auditorium.",
    isLive: true,
  },
  {
    id: 2,
    title: "Career Fair 2026",
    date: "25 Jun",
    status: "upcoming",
    statusLabel: "Upcoming",
    subject: "Career Development",
    instructor: "CDC Office",
    description:
      "Meet recruiters from top tech companies and submit your resume at the engineering building.",
  },
  {
    id: 3,
    title: "AI & ML Workshop",
    date: "12 Jun",
    status: "submitted",
    statusLabel: "Registered",
    subject: "Artificial Intelligence",
    instructor: "Dr. Hasan",
    description:
      "Hands-on workshop on building RAG-based chatbots in Lab 301, CSE Building.",
    score: 13.5,
    maxScore: 15,
    graded: true,
  },
  {
    id: 4,
    title: "Cultural Night",
    date: "02 Jul",
    status: "submitted",
    statusLabel: "Submitted",
    subject: "Cultural Club",
    instructor: "Student Affairs",
    description:
      "Music, dance, and drama performances by student clubs at the open air theatre.",
  },
];

export const ASSIGNMENTS = [
  {
    id: 1,
    title: "DBMS ER Diagram — University Management System",
    subject: "Database Systems",
    instructor: "Dr. Karim",
    description:
      "Design a complete ER diagram for a university management system including students, courses, faculty, and enrollment relationships.",
    dueDate: "29 May",
    status: "pending",
    daysLeft: "2d left",
  },
  {
    id: 2,
    title: "SE Assignment #1 — Requirements Specification",
    subject: "Software Engineering",
    instructor: "Prof. Huda",
    description:
      "Write a detailed software requirements specification document for the given case study project.",
    dueDate: "31 May",
    status: "pending",
    daysLeft: "4d left",
  },
  {
    id: 3,
    title: "Math Assignment #1 — Simple Matrix Operations",
    subject: "Discrete Mathematics",
    instructor: "Prof. Huda",
    description:
      "Solve the given matrix problems including addition, multiplication, and finding determinants of 3x3 matrices.",
    dueDate: "22 May",
    status: "late",
    penaltyNote: "* 50% mark will be deducted if submitted late",
  },
  {
    id: 4,
    title: "SE Assignment #2 — UML Class Diagrams",
    subject: "Software Engineering",
    instructor: "Prof. Huda",
    description:
      "Create UML class diagrams for the library management system including all classes, attributes, methods, and relationships.",
    dueDate: "24 May",
    status: "submitted",
    submittedDate: "24 May",
  },
  {
    id: 5,
    title: "OS Lab Report — Process Scheduling",
    subject: "Operating Systems",
    instructor: "Dr. Alam",
    description:
      "Implement and compare FCFS, SJF, and Round Robin scheduling algorithms with performance analysis.",
    dueDate: "20 May",
    status: "submitted",
    submittedDate: "20 May",
  },
  {
    id: 6,
    title: "CN Assignment — Network Topology Design",
    subject: "Computer Networks",
    instructor: "Dr. Karim",
    description:
      "Design a campus network topology with VLAN configuration and subnet planning documentation.",
    dueDate: "18 May",
    status: "graded",
    score: 13.5,
    maxScore: 15,
  },
  {
    id: 7,
    title: "AI Project — Chatbot Prototype",
    subject: "Artificial Intelligence",
    instructor: "Dr. Hasan",
    description:
      "Build a simple rule-based chatbot prototype with natural language processing capabilities.",
    dueDate: "15 May",
    status: "graded",
    score: 12,
    maxScore: 15,
  },
];

export const SCHEDULE = [
  { day: "Sunday", time: "9:00 - 10:30", course: "Software Engineering", room: "Room 401" },
  { day: "Sunday", time: "11:00 - 12:30", course: "Database Management", room: "Lab 201" },
  { day: "Monday", time: "9:00 - 10:30", course: "Operating Systems", room: "Room 302" },
  { day: "Monday", time: "2:00 - 3:30", course: "Computer Networks", room: "Room 405" },
  { day: "Tuesday", time: "10:00 - 11:30", course: "Artificial Intelligence", room: "Lab 301" },
  { day: "Wednesday", time: "9:00 - 10:30", course: "Software Engineering", room: "Room 401" },
  { day: "Thursday", time: "11:00 - 12:30", course: "Database Management", room: "Lab 201" },
];

export const TAG_COLORS = {
  Academic: "bg-amber-100 text-amber-800",
  Administration: "bg-purple-100 text-purple-800",
  Events: "bg-blue-100 text-blue-800",
  Sports: "bg-green-100 text-green-800",
  Urgent: "bg-red-500 text-white",
};
