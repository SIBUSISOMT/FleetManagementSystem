const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver.controller');

// Route for retrieving trips
router.get('/trips', driverController.getTrips);

// Route for reporting issues
router.post('/report-issue', driverController.reportIssue);

module.exports = router;
