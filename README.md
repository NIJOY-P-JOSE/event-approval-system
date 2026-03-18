# 🚀 Event Approval Workflow Automation System

🔗 **Repository:** https://github.com/NIJOY-P-JOSE/event-approval-system  
🔗 **Frontend:** https://github.com/NIJOY-P-JOSE/event-approval-system/tree/main/frontend  

---

## 📌 Overview

The **Event Approval Workflow Automation System** is a full-stack web application designed to **digitize and automate event creation and approval processes** in educational institutions.

Traditional methods using paper forms, emails, and informal communication lead to delays and inefficiencies. This system introduces a **centralized digital workflow** with real-time tracking and structured approvals.

---

## 🎯 Objectives

- Automate event approval workflow  
- Provide role-based system access  
- Enable real-time event tracking  
- Reduce manual paperwork  
- Improve communication between stakeholders  

---

## 🧠 Core Workflow

Faculty → Create Event  
    ↓  
Student Coordinator → Update Details  
    ↓  
Submit Event  
    ↓  
Approval Flow:  
Faculty → Department Head → HOD → Final Approval  

---

## 🏗️ System Architecture

User  
↓  
Next.js Frontend (React)  
↓  
REST API (HTTP Requests)  
↓  
Django Backend (Django REST Framework)  
↓  
Database (SQLite / PostgreSQL)  

---

## ⚙️ Tech Stack

### 🔹 Frontend
- Next.js (React)
- Tailwind CSS
- Dashboard UI (v0 AI generated)

### 🔹 Backend
- Django
- Django REST Framework
- JWT Authentication

### 🔹 Database
- SQLite (current)
- PostgreSQL (planned)

### 🔹 Tools
- Git & GitHub
- REST APIs
- JSON Web Tokens (JWT)

---

## 👥 User Roles

| Role | Description |
|------|------------|
| Faculty | Creates events |
| Student Coordinator | Updates event details |
| Sub Coordinator | Assists coordinator |
| Volunteer | Supports event |
| Lab Staff | Handles lab resources |
| Electric Staff | Handles electrical needs |
| Treasurer | Manages budget |
| Dept Head | Approves events |
| HOD | Final approval |

---

## 📦 Core Modules

### 1️⃣ User Management
- Custom user model  
- Role-based access control  
- JWT authentication  

### 2️⃣ Event Management
- Event creation  
- Event updates  
- Event tracking  

### 3️⃣ Approval Workflow
- Multi-level approval system  
- Status tracking  

### 4️⃣ Profile System
- User profile API  
- Editable profile page  
- Navbar integration  

### 5️⃣ Authentication System
- Login API  
- JWT token handling  
- Secure sessions  

---

## 🔐 Authentication Flow

User Login  
↓  
POST /api/users/login/  
↓  
JWT Token Generated  
↓  
Stored in localStorage  
↓  
Used for API Requests  

---

## 🔗 API Endpoints

### 🔹 Authentication

POST   /api/users/login/  
GET    /api/users/profile/  

### 🔹 Events

GET    /api/events/  
POST   /api/events/  
GET    /api/events/<id>/  
PUT    /api/events/<id>/  
DELETE /api/events/<id>/  

---

## 🎨 Frontend Features

- Login page  
- Dashboard UI  
- Events list  
- Event details page  
- Profile page  
- Navbar with user info  
- Logout system  

---

## ⚡ Current Project Status

Backend: ~70% complete  
Frontend: ~60% complete  
Core workflow: Partially implemented  

### ✅ Completed

- JWT authentication  
- User profile API  
- Event CRUD APIs  
- Frontend-backend integration  
- Dashboard UI  
- Role-based access  

### ⚠️ In Progress

- Event submission flow  
- Coordinator assignment UI  
- Approval workflow  

---

## 🚧 Upcoming Features (Not Yet Implemented)

### 🔹 Event Workflow
- Event submission (draft → submitted)  
- Approval tracking timeline  

### 🔹 Approval System
- Faculty approval  
- Department head approval  
- HOD approval  
- Approval comments  

### 🔹 Resource Management
- Lab requests  
- Electrical requests  
- Room booking  

### 🔹 Duty Leave System
- OD request system  
- Image verification  
- PDF generation  

### 🔹 Notifications
- Email notifications  
- In-app alerts  

### 🔹 Dashboard Enhancements
- Role-based dashboards  
- Reports & analytics  

---

## 🧪 Known Issues / Improvements

- Better frontend error handling  
- Status synchronization  
- File upload (PDF support)  
- Pagination & filtering  

---

## 📂 Project Structure

event-approval-system/  
│  
├── users/            # User management  
├── events/           # Event module  
├── approvals/        # Approval workflow  
│  
├── frontend/         # Next.js frontend  
│  
├── templates/  
├── static/  
├── media/  
│  
├── config/  
├── manage.py  

---

## 🚀 Getting Started

### 🔹 Backend Setup

git clone https://github.com/NIJOY-P-JOSE/event-approval-system.git  
cd event-approval-system  

python -m venv venv  
source venv/bin/activate   (Windows: venv\Scripts\activate)  

pip install -r requirements.txt  

python manage.py migrate  
python manage.py runserver  

---

### 🔹 Frontend Setup

cd frontend  
npm install  
npm run dev  

Frontend: http://localhost:3000  
Backend: http://127.0.0.1:8000  

---

## 🎯 Final Goal

Create → Assign → Update → Submit → Approve → Finalize  

---

## 👨‍💻 Contributors

- Nijoy P Jose  
- Mini Project Team  

---

## 📌 License

This project is developed as part of a **college mini project (S5 CSE)**.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!