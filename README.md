# Full Stack Authentication System

A full-stack authentication system built using React, Node.js, Express, PostgreSQL, JWT, and bcrypt.

This project demonstrates modern authentication and authorization concepts including user registration, login, protected routes, password reset, refresh tokens, email verification, and role-based access control (RBAC).

---

## Features

### Authentication
- User Registration (Signup)
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Refresh Token Support
- Logout Functionality

### Authorization
- Protected Routes
- Role-Based Access Control (RBAC)
- Admin Route Protection

### User Management
- User Dashboard
- Profile Information
- Last Login Tracking

### Security Features
- Password Reset System
- Email Verification Flow
- Token Expiration Handling
- Secure Password Storage

### Database
- PostgreSQL Integration
- User Management Tables
- Refresh Token Storage
- Password Reset Token Storage
- Email Verification Token Storage

---

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Authentication & Security
- JWT (JSON Web Token)
- bcrypt

### Development Tools
- Nodemon
- dotenv

---

## Project Structure

```text
loginapp
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── routes
│   │   ├── components
│   │   └── App.js
│   │
│   └── package.json
│
├── backend
│   ├── config
│   ├── middleware
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd loginapp
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret_key
```

Start backend server:

```bash
npm run dev
```

Server runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm start
```

Application runs on:

```text
http://localhost:3000
```

---

## Database Tables

### users

```sql
id
name
email
password
role
verified
last_login
```

### refresh_tokens

```sql
id
user_id
token
```

### password_reset

```sql
id
user_id
token
expires_at
```

### email_verification

```sql
id
user_id
token
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
```

### Password Management

```http
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Email Verification

```http
POST /api/auth/send-verification
GET  /api/auth/verify/:token
```

### Token Management

```http
POST /api/auth/refresh-token
```

### User

```http
GET /api/user/profile
```

### Admin

```http
GET /api/admin/dashboard
```

---

## Learning Outcomes

This project helped implement and understand:

- Authentication vs Authorization
- JWT Token Management
- Refresh Tokens
- Protected Routes
- Password Hashing
- PostgreSQL Integration
- REST API Development
- Express Middleware
- Role-Based Access Control
- Full Stack Development Workflow

---

## Author

Developed as part of a Full Stack Authentication Internship Assignment.
