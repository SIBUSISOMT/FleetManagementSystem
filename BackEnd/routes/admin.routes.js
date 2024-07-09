const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Routes for managing routes
router.post('/routes', adminController.addRoute);
router.get('/routes', adminController.getRoutes);

// Routes for logging trips
router.post('/log-trip', adminController.logTrip);
router.get('/trips', adminController.getTrips);

module.exports = router;
