const express = require('express');
const router = express.Router();
const routeController = require('../controllers/route.controller');

router.get('/routes', routeController.getAllRoutes);
router.post('/routes', routeController.createRoute);

module.exports = router;
