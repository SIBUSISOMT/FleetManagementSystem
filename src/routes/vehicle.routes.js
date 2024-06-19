const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');

router.get('/vehicles', vehicleController.getAllVehicles);
router.post('/vehicles', vehicleController.createVehicle);

module.exports = router;
