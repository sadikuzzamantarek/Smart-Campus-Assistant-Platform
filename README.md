# 🎓 Smart Campus Assistant Platform

> A collaborative hackathon project simulating a real-world software company, where every team owns a piece of a full-stack AI-powered university assistant system.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Platform Features](#-platform-features)
- [Repository Structure](#-repository-structure)
- [Team Directory](#-team-directory)
- [Git Workflow — How to Contribute](#-git-workflow--how-to-contribute)
  - [Step 1: Fork this Repository](#step-1-fork-this-repository)
  - [Step 2: Clone your Fork](#step-2-clone-your-fork)
  - [Step 3: Create a Branch](#step-3-create-a-branch)
  - [Step 4: Work on your Code](#step-4-work-on-your-code)
  - [Step 5: Commit your Changes](#step-5-commit-your-changes)
  - [Step 6: Push to your Fork](#step-6-push-to-your-fork)
  - [Step 7: Open a Pull Request](#step-7-open-a-pull-request)
  - [Step 8: Keeping your Fork Up to Date](#step-8-keeping-your-fork-up-to-date)
- [Team-Specific Instructions](#-team-specific-instructions)
  - [1. AI Engineer Team](#1--ai-engineer-team)
  - [2. Backend Team](#2--backend-team)
  - [3. Frontend Team](#3--frontend-team)
  - [4. Mobile App Team](#4--mobile-app-team)
  - [5. UI/UX Team](#5--uiux-team)
  - [6. QA Engineer Team](#6--qa-engineer-team)
  - [7. Cybersecurity Team](#7--cybersecurity-team)
  - [8. Data Analysis Team](#8--data-analysis-team)
- [Final Demo Flow](#-final-demo-flow)
- [Rules & Best Practices](#-rules--best-practices)
- [After the Hackathon](#-after-the-hackathon)

---

## 🧠 Project Overview

**Smart Campus Assistant Platform** is a mini AI-powered university management and student assistant system. It is built collaboratively by 8 specialized teams, each responsible for a distinct layer of the platform — just like a real software company.

Think of this platform as:

> _"A one-stop digital campus, where students can check their schedule, read notices, ask an AI chatbot, get assignment reminders, and attend events, all from a single platform."_

**Hackathon Theme:** `Smart Campus Assistant Platform`

**Mother Repository:** [https://github.com/Gaurab1809/Smart-Campus-Assistant-Platform](https://github.com/Gaurab1809/Smart-Campus-Assistant-Platform)

---

## 🌟 Platform Features

| Feature | Description |
|---|---|
| 🤖 AI Chatbot | Answers FAQs, course info, deadlines, teacher contacts |
| 📅 Class Schedules | View and manage weekly class timetables |
| 📢 Notices | University announcements and updates |
| 📝 Assignment Reminders | Deadline alerts for students |
| 🎉 Event Updates | Campus events listing and participation |
| 💬 Student Feedback | Feedback submission system |
| 📊 Analytics Dashboard | Admin insights on usage, logins, chatbot activity |
| 📱 Mobile Access | Full Android app with push notifications |

---

## 📁 Repository Structure

Each team works inside their own dedicated folder in this repository. **Do not modify folders belonging to other teams.**

```
Smart-Campus-Assistant-Platform/
│
├── ai-engineer/          # AI chatbot, LangChain, FastAPI backend for AI
├── backend/              # REST APIs, auth, database, business logic
├── frontend/             # React web dashboard and UI
├── mobile/               # Android (Kotlin + Jetpack Compose) app
├── ui-ux/                # Figma exports, design system, style guide
├── qa/                   # Test cases, bug reports, automation scripts
├── cybersecurity/        # Security audit, OWASP checklist, risk report
├── data-analysis/        # Analytics dashboards, Jupyter notebooks
│
├── docs/                 # Shared documentation and API specs
└── README.md             # This file
```

> ⚠️ **Each team must only create files inside their designated folder.**

---

## 👥 Team Directory

| # | Team | Folder | Core Tech |
|---|---|---|---|
| 1 | AI Engineer | `/ai-engineer` | Python, FastAPI, LangChain, OpenAI API |
| 2 | Backend | `/backend` | Node.js, Express.js, PostgreSQL/MongoDB, JWT |
| 3 | Frontend | `/frontend` | React, Tailwind CSS, Axios |
| 4 | Mobile App | `/mobile` | Kotlin, Jetpack Compose, Retrofit |
| 5 | UI/UX | `/ui-ux` | Figma, Canva |
| 6 | QA Engineer | `/qa` | Postman, Playwright, Manual Testing |
| 7 | Cybersecurity | `/cybersecurity` | Burp Suite, OWASP, Wireshark |
| 8 | Data Analysis | `/data-analysis` | Python, Pandas, Power BI, Jupyter |

---

## 🔧 Git Workflow — How to Contribute

Every team member must follow this workflow. This ensures **no one overwrites anyone else's work** and all code is reviewed before merging.

---

### Step 1: Fork this Repository

1. Go to the mother repository:
   [https://github.com/Gaurab1809/Smart-Campus-Assistant-Platform](https://github.com/Gaurab1809/Smart-Campus-Assistant-Platform)

2. Click the **"Fork"** button in the top-right corner of the page.

3. GitHub will create a copy of this repo under **your own GitHub account**.

> 💡 Your fork will live at: `https://github.com/YOUR_USERNAME/Smart-Campus-Assistant-Platform`

---

### Step 2: Clone your Fork

Open your terminal and clone your fork to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/Smart-Campus-Assistant-Platform.git
cd Smart-Campus-Assistant-Platform
```

Now add the **original (mother) repository** as a remote called `upstream`:

```bash
git remote add upstream https://github.com/Gaurab1809/Smart-Campus-Assistant-Platform.git
```

Verify your remotes:

```bash
git remote -v
# origin    https://github.com/YOUR_USERNAME/Smart-Campus-Assistant-Platform.git (fetch)
# origin    https://github.com/YOUR_USERNAME/Smart-Campus-Assistant-Platform.git (push)
# upstream  https://github.com/Gaurab1809/Smart-Campus-Assistant-Platform.git (fetch)
# upstream  https://github.com/Gaurab1809/Smart-Campus-Assistant-Platform.git (push)
```

---

### Step 3: Create a Branch

**Never work directly on `main`.** Always create a new branch for your team's work.

Branch naming format: `team-name/feature-name`

```bash
# Examples:
git checkout -b backend/auth-api
git checkout -b frontend/dashboard-ui
git checkout -b ai-engineer/chatbot-integration
git checkout -b mobile/login-screen
git checkout -b qa/login-test-cases
```

---

### Step 4: Work on your Code

Make your changes **only inside your team's folder**. For example:

- Backend team → work inside `/backend/`
- Frontend team → work inside `/frontend/`
- Mobile team → work inside `/mobile/`

```bash
# Check which files you've changed
git status

# See the actual changes
git diff
```

---

### Step 5: Commit your Changes

Stage your changed files and commit them with a clear, descriptive message.

```bash
# Stage specific files
git add backend/src/controllers/authController.js

# Or stage all changes in your folder
git add backend/

# Commit with a meaningful message
git commit -m "feat(backend): add JWT authentication and user registration API"
```

**Commit message format:** `type(team): short description`

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, no logic change |
| `refactor` | Code restructure |
| `test` | Adding tests |
| `chore` | Build tasks, configs |

---

### Step 6: Push to your Fork

Push your branch to **your forked repository** (not the mother repo):

```bash
git push origin backend/auth-api
```

Replace `backend/auth-api` with your actual branch name.

---

### Step 7: Open a Pull Request

1. Go to your fork on GitHub:
   `https://github.com/YOUR_USERNAME/Smart-Campus-Assistant-Platform`

2. You will see a yellow banner saying **"Compare & pull request"** — click it.

3. Make sure:
   - **Base repository:** `Gaurab1809/Smart-Campus-Assistant-Platform`
   - **Base branch:** `main`
   - **Head repository:** `YOUR_USERNAME/Smart-Campus-Assistant-Platform`
   - **Compare branch:** your feature branch

4. Write a clear PR title and description:
   ```
   Title:   [Backend] Add JWT Authentication API
   
   Description:
   - Implemented /api/auth/register endpoint
   - Implemented /api/auth/login endpoint with JWT token generation
   - Password hashing with bcrypt
   - Input validation with Zod
   ```

5. Click **"Create Pull Request"**.

> 🚦 A maintainer will review and merge your PR. Do not merge your own PR unless you have been explicitly given permission.

---

### Step 8: Keeping your Fork Up to Date

Before starting any new work, always sync your fork with the latest changes from the mother repository:

```bash
# Fetch latest changes from the mother repo
git fetch upstream

# Switch to your main branch
git checkout main

# Merge upstream changes into your local main
git merge upstream/main

# Push the updated main to your fork
git push origin main
```

Then, when creating a new branch for new work, create it from the updated `main`:

```bash
git checkout -b frontend/notices-page
```

---

### Quick Reference: Common Git Commands

| Action | Command |
|---|---|
| Check status | `git status` |
| View changes | `git diff` |
| Stage all changes | `git add .` |
| Stage specific file | `git add path/to/file` |
| Commit | `git commit -m "message"` |
| Push branch | `git push origin branch-name` |
| Pull latest from upstream | `git fetch upstream && git merge upstream/main` |
| List all branches | `git branch -a` |
| Switch branch | `git checkout branch-name` |
| Create + switch branch | `git checkout -b new-branch-name` |
| Delete local branch | `git branch -d branch-name` |
| View commit history | `git log --oneline` |
| Undo last commit (keep changes) | `git reset --soft HEAD~1` |
| Discard unstaged changes | `git checkout -- .` |

---

## 📋 Team-Specific Instructions

---

### 1. 🤖 AI Engineer Team

**Working Folder:** `/ai-engineer/`

**Role:** Build the AI-powered chatbot assistant and intelligent features for the platform.

#### Responsibilities
- Build a conversational AI chatbot using LangChain and OpenAI API
- Create a FastAPI backend to expose chatbot as REST endpoints
- Answer student FAQs, course information, deadlines, teacher contacts, event suggestions
- Optionally implement RAG (Retrieval-Augmented Generation) for document-based answers

#### Tech Stack

| Category | Tool |
|---|---|
| Language | Python |
| API Framework | FastAPI / Flask |
| AI API | OpenAI API |
| AI Framework | LangChain |
| Vector DB (Optional) | ChromaDB |
| Testing | Postman |
| IDE | VS Code |
| Version Control | Git & GitHub |

#### Folder Structure (suggested)
```
ai-engineer/
├── app/
│   ├── main.py           # FastAPI entry point
│   ├── chatbot.py        # LangChain chatbot logic
│   ├── routes/
│   └── models/
├── data/                 # FAQs, course info (for RAG)
├── requirements.txt
└── README.md             # Setup instructions for your module
```

#### Example Chatbot Queries to Handle
- _"When is the software engineering assignment due?"_
- _"Who teaches DBMS?"_
- _"What events are upcoming this week?"_
- _"What is the contact email for the CS department?"_

#### Deliverables
- Working `/api/chatbot` POST endpoint
- Handles at least 10 FAQ categories
- Integrated with the backend API

#### Branch Naming
```bash
git checkout -b ai-engineer/chatbot-core
git checkout -b ai-engineer/rag-integration
```

---

### 2. 🛠 Backend Team

**Working Folder:** `/backend/`

**Role:** Build the APIs, authentication system, database integration, and core business logic. You are the **brain** of the entire platform.

#### Responsibilities
- User authentication (register, login, JWT)
- CRUD APIs for notices, events, assignments
- Bridge API for the AI chatbot
- Database schema design and management

#### Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL / MongoDB |
| ORM/ODM | Prisma / Mongoose |
| Authentication | JWT |
| API Testing | Postman |
| API Documentation | Swagger |
| Validation | Joi / Zod |
| Version Control | Git & GitHub |

#### Folder Structure (suggested)
```
backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   ├── utils/
│   └── app.js
├── .env.example          # Never commit actual .env files!
├── package.json
└── README.md
```

#### Required API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/notices
POST   /api/notices
GET    /api/events
POST   /api/events
GET    /api/assignments
POST   /api/chatbot
```

#### Database Schema

**Users:** `id`, `name`, `email`, `password` (hashed), `role`
**Notices:** `title`, `description`, `createdAt`
**Events:** `title`, `date`, `location`
**Assignments:** `title`, `course`, `dueDate`

#### Security Requirements
- JWT middleware on protected routes
- Password hashing with bcrypt
- Input validation on all POST routes
- Store secrets in `.env` — never hardcode them

#### Deliverables
- All required API endpoints working
- Swagger/Postman collection exported
- `.env.example` with all required keys listed

#### Branch Naming
```bash
git checkout -b backend/auth-api
git checkout -b backend/notices-api
git checkout -b backend/events-api
```

---

### 3. 🖥 Frontend Team

**Working Folder:** `/frontend/`

**Role:** Build the responsive web dashboard and integrate all backend APIs.

#### Responsibilities
- Build a clean, modern web UI with React and Tailwind CSS
- Connect to the backend REST APIs using Axios
- Create all required pages and implement navigation

#### Tech Stack

| Category | Tool |
|---|---|
| Framework | React |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| State Management | Context API |
| Deployment | Vercel / Netlify |
| IDE | VS Code |
| Version Control | GitHub |

#### Required Pages

| Page | Path | Description |
|---|---|---|
| Login | `/login` | Student/admin login |
| Dashboard | `/dashboard` | Overview of notices, events, assignments |
| Notices | `/notices` | List of all university notices |
| Events | `/events` | Upcoming campus events |
| AI Assistant | `/assistant` | Chat interface for the AI chatbot |
| Analytics | `/analytics` | Usage stats (admin only) |

#### Folder Structure (suggested)
```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── hooks/            # Custom React hooks
│   ├── context/          # Context API providers
│   ├── api/              # Axios API call functions
│   └── App.jsx
├── public/
├── package.json
└── README.md
```

#### Deliverables
- All pages built and navigable
- Axios API integration with backend
- Fully responsive (mobile + desktop)
- Deployed to Vercel or Netlify

#### Branch Naming
```bash
git checkout -b frontend/login-page
git checkout -b frontend/dashboard-ui
git checkout -b frontend/ai-assistant-page
```

---

### 4. 📱 Mobile App Team

**Working Folder:** `/mobile/`

**Role:** Develop the Android mobile application for the Smart Campus Assistant Platform.

#### Responsibilities
- Build a native Android app allowing students to access all core features on mobile
- Integrate with the backend REST APIs
- Implement mock push notifications for reminders

#### Tech Stack

| Category | Technology |
|---|---|
| Language | Kotlin |
| IDE | Android Studio |
| UI Framework | Jetpack Compose |
| Architecture | MVVM |
| Networking | Retrofit |
| JSON Parsing | Gson / Kotlin Serialization |
| Local Storage | Room Database |
| Version Control | Git & GitHub |

#### Required Features

**Must Have:**
- Login screen with JWT token storage
- Dashboard showing notices, events, assignments
- AI Assistant chat interface
- API integration with backend

**Optional:**
- Push notification reminders (mock)
- Offline caching with Room

#### Folder Structure (suggested)
```
mobile/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/smartcampus/
│   │   │   │   ├── ui/
│   │   │   │   ├── screens/
│   │   │   │   ├── api/
│   │   │   │   ├── repository/
│   │   │   │   ├── models/
│   │   │   │   ├── viewmodel/
│   │   │   │   └── MainActivity.kt
│   │   │   └── res/
├── build.gradle
└── README.md
```

#### Deliverables
- APK file that can be installed and demoed
- Login, Dashboard, and AI chat screens working
- Connected to backend API

#### Branch Naming
```bash
git checkout -b mobile/login-screen
git checkout -b mobile/dashboard-screen
git checkout -b mobile/api-integration
```

---

### 5. 🎨 UI/UX Team

**Working Folder:** `/ui-ux/`

**Role:** Design the visual system, wireframes, and user experience for the entire platform.

#### Responsibilities
- Create the design system (colors, typography, components)
- Wireframe all screens (web and mobile)
- Build interactive Figma prototype
- Share assets and style guide with frontend and mobile teams

#### Tools

| Category | Tool |
|---|---|
| Design | Figma |
| Prototype | Figma Prototype |
| Graphics | Canva |
| Inspiration | Dribbble / Behance |

#### Tasks
- Define a color palette and typography system
- Wireframe: Login, Dashboard, Notices, Events, AI Assistant, Analytics
- Design mobile app screens
- Export assets (icons, illustrations) for frontend and mobile teams
- Document the component style guide

#### Folder Structure (suggested)
```
ui-ux/
├── wireframes/           # Low-fidelity wireframe exports (PNG/PDF)
├── designs/              # High-fidelity design exports
├── assets/               # Icons, illustrations, logos
├── style-guide/          # Color palette, fonts, component specs
└── README.md             # Link to Figma file and design decisions
```

#### Deliverables
- Figma prototype link (shareable, view-only)
- Exported design assets in `/assets/`
- Style guide document (colors, fonts, spacing, components)

#### Branch Naming
```bash
git checkout -b ui-ux/wireframes
git checkout -b ui-ux/design-system
git checkout -b ui-ux/asset-exports
```

---

### 6. 🧪 QA Engineer Team

**Working Folder:** `/qa/`

**Role:** Test the entire platform and ensure everything works correctly across all layers.

#### Responsibilities
- Write and execute manual test cases
- Perform API testing using Postman
- Automate key flows using Playwright
- Report all bugs clearly with reproduction steps

#### Tools

| Category | Tool |
|---|---|
| API Testing | Postman |
| Browser Testing | Chrome DevTools |
| Automation | Playwright / Selenium |
| Bug Tracking | Trello / Notion |
| Documentation | Google Sheets / Markdown |

#### Test Coverage Areas
- Login and authentication flow
- Notice and event creation/retrieval APIs
- AI chatbot responses
- UI responsiveness across screen sizes
- Mobile app screens
- Cross-device testing (Android, Chrome, Firefox)

#### Folder Structure (suggested)
```
qa/
├── test-cases/
│   ├── login-tests.md
│   ├── api-tests.md
│   └── ui-tests.md
├── bug-reports/
│   └── bug-report-template.md
├── automation/
│   └── playwright/
├── postman/
│   └── SmartCampus.postman_collection.json
└── README.md
```

#### Deliverables
- Complete test case document (at least 20 test cases)
- Bug report document with all found issues
- Postman collection for API tests

#### Branch Naming
```bash
git checkout -b qa/login-test-cases
git checkout -b qa/api-testing
git checkout -b qa/playwright-automation
```

---

### 7. 🔒 Cybersecurity Team

**Working Folder:** `/cybersecurity/`

**Role:** Review the platform for security vulnerabilities and ensure it follows security best practices.

#### Responsibilities
- Review JWT implementation for weaknesses
- Check all APIs for common vulnerabilities
- Validate input sanitization and password hashing
- Review environment variable handling
- Run through the OWASP Top 10 checklist

#### Tools

| Category | Tool |
|---|---|
| Security Reference | OWASP Top 10 |
| API Testing | Postman |
| Browser Analysis | Chrome DevTools |
| Network Analysis | Wireshark |
| Vulnerability Testing | Burp Suite Community |

#### Security Tasks
- JWT token security review (expiry, secret strength, storage)
- Password validation (min length, hashing algorithm)
- API vulnerability scan (injection, broken auth, CORS)
- Rate limiting assessment
- OWASP Top 10 checklist walkthrough
- **Bonus:** Run a simple penetration testing demo

#### Folder Structure (suggested)
```
cybersecurity/
├── audit/
│   ├── owasp-checklist.md
│   ├── jwt-review.md
│   └── api-vulnerability-report.md
├── risk-report/
│   └── risk-report.md
├── pentest/              # Optional: demo scripts/notes
└── README.md
```

#### Deliverables
- OWASP Top 10 audit checklist (checked against the platform)
- Risk report with severity ratings (Critical / High / Medium / Low)
- Recommendations for each vulnerability found

#### Branch Naming
```bash
git checkout -b cybersecurity/owasp-audit
git checkout -b cybersecurity/jwt-review
git checkout -b cybersecurity/risk-report
```

---

### 8. 📊 Data Analysis Team

**Working Folder:** `/data-analysis/`

**Role:** Analyze platform usage data and generate insights for the admin dashboard.

#### Responsibilities
- Process simulated or real platform usage data
- Generate visualizations and insights
- Build an analytics dashboard
- Present findings to the team at the final demo

#### Tools

| Category | Tool |
|---|---|
| Language | Python |
| Data Library | Pandas |
| Visualization | Power BI / Matplotlib / Seaborn |
| Data Storage | Excel / CSV |
| Notebook | Jupyter Notebook |

#### Analysis Areas
- Most active students (login frequency)
- Most viewed notices
- Event participation rates
- Chatbot query frequency and topics
- Login time trends (peak hours)

#### Folder Structure (suggested)
```
data-analysis/
├── data/
│   ├── sample_users.csv
│   ├── sample_logins.csv
│   └── sample_chatbot_logs.csv
├── notebooks/
│   └── analysis.ipynb
├── dashboards/
│   └── campus_dashboard.pbix   # Power BI file
├── reports/
│   └── insights-presentation.pdf
└── README.md
```

#### Deliverables
- Jupyter notebook with full analysis and charts
- Analytics dashboard (Power BI or Python-based)
- Insights presentation (PDF or slides)

#### Branch Naming
```bash
git checkout -b data-analysis/notebook-setup
git checkout -b data-analysis/dashboard
git checkout -b data-analysis/insights-report
```

---

## 🚀 Final Demo Flow

At the end of the hackathon, the platform will be demonstrated in this order:

```
User Opens App
    ↓
Login (Frontend / Mobile)
    ↓
Dashboard — View notices and events
    ↓
Ask AI Chatbot — "When is the assignment due?"
    ↓
Receive Assignment Reminder
    ↓
Admin views Analytics Dashboard
```

Then each support team presents:

- **QA Team** — presents bug findings and test coverage
- **Cybersecurity Team** — presents vulnerabilities found and risk report
- **Data Analysis Team** — presents usage insights and dashboard

---

## 📏 Rules & Best Practices

### ✅ Do's
- Always create a branch before working (`git checkout -b team/feature`)
- Only work inside your own team's folder
- Write meaningful commit messages
- Push your work to your fork frequently
- Open a Pull Request when your feature is ready
- Communicate with other teams (especially Backend ↔ Frontend ↔ AI)
- Add a `README.md` inside your team's folder explaining how to run your module

### ❌ Don'ts
- Never commit directly to `main`
- Never modify another team's folder
- Never commit `.env` files with real credentials — use `.env.example` instead
- Never force-push to shared branches
- Never push broken/non-working code without flagging it

### 🤝 Cross-Team Communication
These teams depend on each other and must coordinate:

| Team A | Depends On | For |
|---|---|---|
| Frontend | Backend | API endpoints and response format |
| Mobile | Backend | Same APIs as Frontend |
| AI Engineer | Backend | `/api/chatbot` route integration |
| QA | All teams | Access to working features to test |
| Data Analysis | Backend | Access to usage logs/data |
| Cybersecurity | Backend | API endpoints to audit |
| UI/UX | Frontend + Mobile | Design handoff (assets, style guide) |

---

## 🎯 After the Hackathon

Each team should take these steps to grow from the experience:

1. **Improve code quality** — refactor, add comments, fix bugs from QA report
2. **Add documentation** — write a proper `README.md` in your module folder
3. **Deploy publicly** — host your module (Vercel for frontend, Render for backend, etc.)
4. **Add to your CV and LinkedIn** — list your role and tech stack
5. **Continue the learning roadmap** — follow the Beginner → Intermediate → Advanced path for your team

### Deployment Recommendations by Team

| Team | Recommended Platform |
|---|---|
| Frontend | Vercel / Netlify |
| Backend | Render / Railway |
| Database | Supabase / Railway |
| AI Engineer | Render / Hugging Face Spaces |
| Mobile | Firebase App Distribution → Google Play Store |
| Data Analysis | Jupyter nbviewer / Streamlit Cloud |

---

## 💼 Career Paths

| Team | Career Opportunities |
|---|---|
| AI Engineer | AI Engineer, ML Engineer, AI Product Developer |
| Backend | Backend Developer, Node.js Developer, API Engineer |
| Frontend | Frontend Developer, React Developer, UI Engineer |
| Mobile | Android Developer, Kotlin Developer, Mobile Engineer |
| UI/UX | UI Designer, UX Designer, Product Designer |
| QA | QA Engineer, Automation Tester, SQA Engineer |
| Cybersecurity | Security Analyst, Penetration Tester, SOC Engineer |
| Data Analysis | Data Analyst, BI Developer, Data Scientist |

---

## 📬 Questions?

If you have questions:
- Open a **GitHub Issue** in the mother repository
- Tag it with your team label (e.g., `team: backend`, `team: frontend`)
- Or contact the project maintainer via the repository

---

> _Built with ❤️ during a collaborative hackathon — simulating a real software company._
