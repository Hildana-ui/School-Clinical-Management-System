<<<<<<< HEAD
require('dotenv').config(); // Load .env variables
=======
require('dotenv').config();   // 👈 THIS LINE WAS MISSING
>>>>>>> af3dfbda378efcf0f281d5a9c33f05a74e9ee44b
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

<<<<<<< HEAD
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    process.exit(1); // stop server if DB fails
  }
  console.log('Connected to MySQL');
=======
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Database connected');
>>>>>>> af3dfbda378efcf0f281d5a9c33f05a74e9ee44b
});

module.exports = db;


