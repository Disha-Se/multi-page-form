# 📝 Multi-Page Form Application

This is a full-stack web application built with **React (Vite)** on the frontend and **Node.js + MongoDB + Prisma** on the backend. It allows users to fill out a multi-step form, with data persistence and validation handled both client- and server-side.

## 🔧 Tech Stack

- **Frontend:**
  - React (with Vite)
  - react-hook-form
  - react-router-dom
  - LocalStorage for temporary data persistence

- **Backend:**
  - Node.js with Express
  - MongoDB (via Prisma ORM)
  - express-validator for server-side validation

---

## 🚀 Features Implemented

### ✅ Frontend
- Multi-page form with **3 separate pages**
- **Navigation** (Next/Back) with validation and route protection
- Uses `react-hook-form` for form state management and validation
- **Dynamic form inputs** on Page 3 (Projects)
- Saves data on every page to **localStorage**
- Auto-fills forms on page revisit using saved data
- Sends data to the backend via `POST` requests on navigation
- Form validation (required fields, email format, zipcode checks, etc.)

### ✅ Backend
- Built with Express.js
- **MongoDB** database integrated using **Prisma ORM**
- Unified `POST /api/form` endpoint to accept and persist user form data
- Server-side validation using `express-validator`
- Stores and updates form entries in MongoDB, grouped by user/session

---

## 📄 Form Pages Breakdown

### 📘 Page 1: Personal Information
- Name, Email
- Address Line 1, Address Line 2
- City, State, Zipcode

### 📗 Page 2: Educational Status
- Checkbox: "Are you still studying?"
- If checked: Input for Institution Name

### 📙 Page 3: Projects
- Dynamic project entries:
  - Project Name
  - Project Description
- Ability to add/remove multiple project forms

---

## ⚠️ Validation
- Client-side validation via `react-hook-form`
- Server-side validation via `express-validator`

---

## 📦 Installation Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Disha-Se/multi-page-form-app.git
cd multi-page-form-app
```
### 2. Install Dependencies
Frontend
```bash
cd client
npm install
npm run dev
```
Backend
```bash
cd server
npm install
npx prisma generate
npm run dev
```
Make sure MongoDB is running and your .env file contains your database URL.

### Folder Structure (Basic Overview)
```bash
/frontend
  ├── pages/
  │   ├── Page1.jsx
  │   ├── Page2.jsx
  │   └── Page3.jsx
  └── App.jsx

/backend
  ├── routes/
  │   └── formRoutes.js
  ├── prisma/
  │   └── schema.prisma
  └── index.js
```


