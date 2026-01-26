const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription.controller');

router.post('/', prescriptionController.addPrescription);
router.put(':id', prescriptionController.updatePrescription);

module.exports = router;