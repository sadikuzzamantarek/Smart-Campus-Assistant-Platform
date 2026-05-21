## Overview
#### Before continuing make sure
1. You are on your working directory `/backend`
2. run `npm install`
#### Installed dependencies (installed automatically after npm install)
1. express
2. bcryptjs
3. cookie-parser
4. cors
5. dotenv
6. express
7. jsonwebtoken
8. mongoose
9. nodemon (dev dependency)

### New API should be on `/api/your_api_url`. The structure is created

### Request Flow
`/api/check` -> middleware -> controller -> service
*Handle the request in controller and business logics in services*
### Database
Configuration created. While working on localhost you need ***mongodb installed on your device first.***

### Environment Variables
Example format of this is given in `env.example` file. This will be updated as per project requirements.

### First look you can expect
run `npm run dev` for node --watch or `npm run dev_nodemon` for nodemon
Then in the browser or postman
`http://localhost:PORT_NUMBER_AS_YOU_USED_IN_ENV_OR_5000/api/check`

You should see in your console
```
Server running on port 4000
MongoDB Connected: localhost
Middleware: [2026-05-21T22:46:18.599Z] GET /check
Controller Checked
Service checked
```
### Now make changes and fulfill the requirement as the best practise included in the structure
### Happy coding ☺️




# 🛠 Backend Team

**Working Folder:** `/backend/`

**Role:** Build the APIs, authentication system, database integration, and core business logic. You are the **brain** of the entire platform.

#### Responsibilities

- User authentication (register, login, JWT)
- CRUD APIs for notices, events, assignments
- Bridge API for the AI chatbot
- Database schema design and management

#### Tech Stack

| Category          | Technology           |
| ----------------- | -------------------- |
| Runtime           | Node.js              |
| Framework         | Express.js           |
| Database          | PostgreSQL / MongoDB |
| ORM/ODM           | Prisma / Mongoose    |
| Authentication    | JWT                  |
| API Testing       | Postman              |
| API Documentation | Swagger              |
| Validation        | Joi / Zod            |
| Version Control   | Git & GitHub         |

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
