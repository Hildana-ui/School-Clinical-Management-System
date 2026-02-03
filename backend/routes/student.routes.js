const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.post('/complete-profile/:user_id',studentController.completeStudentProfile);
router.get('/:id', studentController.getStudentbyId);
router.get('/', studentController.getAllStudents);
router.get('/:id/info', studentController.getStudentInfoById);

module.exports = router;
