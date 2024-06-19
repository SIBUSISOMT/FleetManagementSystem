const Route = require('../models/route.model');

// Get all routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll();
    res.json(routes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create a new route
exports.createRoute = async (req, res) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json(route);
  } catch (error) {
    res.status(500).send(error.message);
  }
};  
