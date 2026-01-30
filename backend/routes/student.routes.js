const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.get('/:id', studentController.getStudentbyId);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentInfoById);

module.exports = router;
