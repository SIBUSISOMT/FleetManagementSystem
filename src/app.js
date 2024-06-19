require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const driverRoutes = require('./routes/driver.routes');
const employeeRoutes = require('./routes/employee.routes');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// My Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/', employeeRoutes);

sequelize.sync().then(() => {
  console.log('Database synchronized !!');
}).catch((error) => {
  console.error('Unable to synchronize the database:', error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
