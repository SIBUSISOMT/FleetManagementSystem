const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Vehicle = sequelize.define('Vehicle', {
  make: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  licensePlate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add other fields as needed
});

module.exports = Vehicle;
