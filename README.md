# 🗂️ Kanban Board App

A full-stack Kanban task manager built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. Supports drag-and-drop task management across multiple columns with priority levels.

---

## 🛠️ Tech Stack

| Layer       | Technology           |
| ----------- | -------------------- |
| Frontend    | React + Vite         |
| Styling     | Tailwind CSS         |
| Drag & Drop | @hello-pangea/dnd    |
| HTTP Client | Axios                |
| Backend     | Node.js + Express.js |
| Database    | MongoDB + Mongoose   |

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) (LTS version recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)

---

### Clone the Repository

```bash
git clone https://github.com/your-username/kanban-app.git
cd kanban-app
```

---

## 🚀 Running Both Servers

You need **two terminals** running at the same time:

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

---

## 📦 Dependencies

### Backend

```
express        — Web framework
mongoose       — MongoDB ODM
dotenv         — Environment variable management
cors           — Cross-origin resource sharing
nodemon        — Auto-restart on file changes (dev)
```

### Frontend

```
react                — UI library
vite                 — Build tool and dev server
axios                — HTTP client
@hello-pangea/dnd    — Drag and drop
tailwindcss          — Utility-first CSS framework
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
