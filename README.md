# HMCTS Task Manager

A full-stack task management system built for the DTS Developer Technical Test.  
The backend is implemented in Java (Spring Boot), and the frontend (HTML, CSS, JavaScript) is served from `resources/static`.

---

## 🚀 Features
- Create, view, update, and delete tasks
- Task properties: Title, Description, Status, Due Date/Time
- RESTful API with validation and error handling
- Embedded frontend served from the backend
- Unit tests included

---

## 🛠 Tech Stack
- **Backend**: Java (Spring Boot)
- **Frontend**: HTML, CSS, JavaScript (in `src/main/resources/static`)
- **Database**: PostgreSQL
- **Build Tool**: Maven

---

## 📦 Setup & Run

### 1. Clone the repository
```bash
https://github.com/Fizzyfeezy/hmcts-task-manager.git
cd hmcts-task-manager
```
### 2. Build and run the backend using Maven:
```bash
mvn clean install
mvn spring-boot:run

Once the server starts, access the application in your browser:

Frontend UI: http://localhost:8080/

API Root Endpoint: http://localhost:8080/api/tasks
```
### 3. API Endpoints
| Method     | Endpoint                 | Description         |
| ---------- | ------------------------ | ------------------- |
| **POST**   | `/api/tasks`             | Create a new task   |
| **GET**    | `/api/tasks`             | Retrieve all tasks  |
| **GET**    | `/api/tasks/{id}`        | Retrieve task by ID |
| **PUT**    | `/api/tasks/{id}/status` | Update task status  |
| **DELETE** | `/api/tasks/{id}`        | Delete task         |

### 4. Example Task JSON
```bash
{
  "title": "Prepare evidence bundle",
  "description": "Collect and organize documents",
  "status": "In Progress",
  "dueDateTime": "2025-09-01T17:00:00"
}
```

### 5. Configuration

Application config can be adjusted in:
```bash
src/main/resources/application.properties
```

---

Developer Notes

Ensure you have Java 17+ installed.
Maven will handle dependencies automatically.
Frontend is static and requires no build step.

---

License

This project was created as part of the DTS Developer Technical Test.

