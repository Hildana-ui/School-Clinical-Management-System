const express = require('express');
const router = express.Router();
const emergencyTypeController = require('../controllers/emergencyType.controller');

router.get('/', emergencyTypeController.getAllEmergencyTypes);

module.exports = router;