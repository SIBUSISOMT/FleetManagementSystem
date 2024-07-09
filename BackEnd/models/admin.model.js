const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Trip = sequelize.define('Trip', {
  trip_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  route_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  start: {
    type: DataTypes.TIME,
    allowNull: false
  },
  end: {
    type: DataTypes.TIME,
    allowNull: false
  },
  mileage: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fuel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'trips', 
  timestamps: false
});

module.exports = Trip;
