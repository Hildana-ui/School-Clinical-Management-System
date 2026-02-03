require('dotenv').config();


const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: [
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/visits', require('./routes/visit.routes'));
app.use('/api/emergency-types', require('./routes/emergencyType.routes'))
app.use('/api/prescription', require('./routes/prescription.routes'));
app.use('/api/students', require('./routes/student.routes'));
// app.use('/api/students', require('./routes/student.routes'));


app.listen(3000, () => {
  console.log('Server running on port 3000');
});
