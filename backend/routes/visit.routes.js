const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visit.controller');

router.post('/', visitController.addVisit);

router.put('/:id', visitController.updateVisit);

module.exports = router;