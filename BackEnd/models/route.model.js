const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Route = sequelize.define('Route', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Route;
