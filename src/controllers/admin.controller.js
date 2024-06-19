const { Route, Trip } = require('../models/admin.model');

exports.addRoute = async (req, res) => {
  try {
    const { destination, departureTime } = req.body;
    const newRoute = await Route.create({ destination, departureTime });
    res.status(201).json({ message: 'Route added successfully', route: newRoute });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll();
    res.status(200).json({ routes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.logTrip = async (req, res) => {
  try {
    const { date, start, end, mileage, fuel } = req.body;
    const newTrip = await Trip.create({ date, start, end, mileage, fuel });
    res.status(201).json({ message: 'Trip logged successfully', trip: newTrip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.status(200).json({ trips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
