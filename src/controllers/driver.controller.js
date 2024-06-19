const { Trip, Issue } = require('../config/db.config'); // Adjust according to your models

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.status(200).json({ trips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.reportIssue = async (req, res) => {
  try {
    const { tripId, description, date } = req.body;
    const newIssue = await Issue.create({ tripId, description, date });
    res.status(201).json({ message: 'Issue reported successfully', issue: newIssue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
