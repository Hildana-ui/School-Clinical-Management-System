const express = require('express');
const router = express.Router();
const controller = require('../controllers/emergencyType.controller');

router.get('/', controller.getAllEmergencyTypes);
router.post('/', controller.createEmergencyType);
router.put('/:id', controller.updateEmergencyType);
router.delete('/:id', controller.deleteEmergencyType);

module.exports = router;
