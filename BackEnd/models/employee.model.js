const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Employee = sequelize.define('Employee', {
  employee_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  first_name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  position: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'employees',
  timestamps: false
});

module.exports = Employee;
