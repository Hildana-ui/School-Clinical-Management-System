require('dotenv').config(); // Load .env variables
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    process.exit(1); // stop server if DB fails
  }
  console.log('Connected to MySQL');
});

module.exports = db;


