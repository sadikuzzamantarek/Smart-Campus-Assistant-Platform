# Smart Campus Assistant — Frontend

React web app for the Smart Campus Assistant Platform.

## Features

- **Login** — Student ID + password authentication
- **Dashboard** — Overview of notices, events, and assignments
- **Notices** — University announcements
- **Events** — Upcoming campus events
- **Assignments** — Track pending and submitted work
- **Schedule** — Weekly class timetable
- **Profile** — Student information
- **AI Chatbot** — Floating widget (bottom-right) connected to the chat API

## Tech Stack

- React 19 + Vite
- Tailwind CSS 4
- React Router
- Axios

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Demo Login

| Field       | Value       |
|-------------|-------------|
| Student ID  | `2024001`   |
| Password    | `student123`|

## Chatbot API

```
POST https://chat.ideahub.com.bd/chat
Body: { "question": "Who teaches DBMS?" }
```

## Project Structure

```
src/
├── api/           # API calls (chatbot)
├── components/    # Reusable UI (layout, chatbot)
├── context/       # Auth context
├── data/          # Mock data (notices, events, etc.)
├── pages/         # Route pages
└── App.jsx        # Router setup
```
