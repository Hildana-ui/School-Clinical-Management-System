const express = require('express');
const router = express.Router();
const controller = require('../controllers/medicalController');

// POST – save record
router.post('/', controller.saveRecord);

// GET – fetch records
router.get('/', controller.getRecords);

module.exports = router;
