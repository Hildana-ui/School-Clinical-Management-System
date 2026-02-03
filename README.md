# School-Clinical-Management-System
A School Clinical Management System built to streamline patient record management, appointment scheduling, and medical inventory tracking for educational institutions. Developed using Java and file-based storage to support user authentication, nurse and student record handling, and report generation.

##  How to Run the Project

### Prerequisites
- Node.js installed
- npm installed
- Visual Studio Code
- Live Server extension (VS Code)
- XAMPP (or WAMP) with MySQL & phpMyAdmin

---

### Database Setup 

1. Open **XAMPP Control Panel**.
2. Start **Apache** and **MySQL**.
3. Open **phpMyAdmin** (`http://localhost/phpmyadmin`).
4. Create a database named:
   ```sql
   clinic_db
5. Import the provided .sql file into the database.

Running the Application

1. Open the project folder in VS Code.
2. Open a terminal in the project root directory.
3. Install backend dependencies:
   ```bash
   npm install
4. Navigate to the backend folder:
   ```bash
   cd backend
5. Start the backend server:
  ```bash
  node server.js

6. Go to the frontend folder.
7. Right-click an HTML file (e.g. student-search.html) and select
“Open with Live Server”.
