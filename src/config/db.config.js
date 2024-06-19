const Sequelize = require('sequelize');

// Replace 'your_database_name', 'your_username', and 'your_password' with your actual database name, username, and password
const sequelize = new Sequelize('fleetdatabase', 'admin', 'Icy@2002', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
