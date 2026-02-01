require('dotenv').config();


const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const db = require('./db');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// ROUTES (DO NOT CHANGE ORDER)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/visits', require('./routes/visit.routes'));
app.use('/api/emergency-types', require('./routes/emergencyType.routes'));
app.use('/api/departments', require('./routes/department.routes'));
app.use('/api/classes', require('./routes/class.routes')); // ✅ THIS ONE
app.use('/api/prescription', require('./routes/prescription.routes'));
app.use('/api/student-search', require('./routes/student.routes'));


app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
