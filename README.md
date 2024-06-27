# Fleet Management System

This is a comprehensive Fleet Management System designed to streamline the management of vehicles, drivers, maintenance, routes, service requests, and employee registrations. The system provides a user-friendly interface with CRUD operations for managing various entities, detailed forms, and a responsive layout for efficient fleet management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)


## Features

- **Driver Management**: Add, update, delete, and view drivers.
- **Vehicle Management**: Add, update, delete, and view vehicles.
- **Maintenance Management**: Track and manage vehicle maintenance.
- **Route Planning**: Plan and manage routes.
- **Service Requests**: Capture and manage service requests from customers.
- **Employee Management**: Register and manage employees.
- **Reports**: Generate various reports related to fleet management.
- **Passport.js Login Strategy**: Secure user authentication using Passport.js.

## Technologies Used

- HTML
- CSS
- JavaScript
- Backend API (Node.js, Express) 


## Dependencies

- `express`: Web framework for Node.js
- `body-parser`: Middleware to parse incoming request bodies
- `mongoose`: ODM for MongoDB
- `passport`: Authentication middleware for Node.js
- `passport-local`: Passport strategy for local authentication
- `express-session`: Session middleware for Express
- `connect-flash`: Flash message middleware for Express
- `bcryptjs`: Library to hash passwords
- `dotenv`: Module to load environment variables from a `.env` file
- `cors`: Middleware to enable CORS
- `morgan`: HTTP request logger middleware for Node.js
- `nodemon`: Development utility that monitors for any changes in your source and automatically restarts your server

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and configure your environment variables
4. Run `npm start` to start the server

## Usage

1. Navigate to `http://localhost:3000` in your browser
2. Use the application to manage drivers, vehicles, routes, items, employees, and reports

## File-Structure

FleetManagementSystem/
│
├── app.js
├── package.json
├── package-lock.json
├── .env
│
├── fleetconnect.session.sql
│
├── src/
│   ├── config/
│   │   ├── auth.config.js
│   │   └── db.config.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── driverController.js
│   │   ├── vehicleController.js
│   │   ├── routeController.js
│   │   ├── itemController.js
│   │   ├── employeeController.js
│   │   └── reportController.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── driverModel.js
│   │   ├── vehicleModel.js
│   │   ├── routeModel.js
│   │   ├── itemModel.js
│   │   ├── employeeModel.js
│   │   └── reportModel.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── driverRoutes.js
│   │   ├── vehicleRoutes.js
│   │   ├── routeRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── reportRoutes.js
│   │
│   └── middleware/
│       └── authMiddleware.js
│
├── public/
│   ├── css/
│   │   ├── admin.css
│   │   ├── driver.css
│   │   ├── employee.registration.css
│   │   ├── reports.css
│   │   └── styles.css
│   │
│   ├── js/
│   │   ├── admin.js
│   │   ├── driver.js
│   │   ├── employee.registration.js
│   │   ├── forgot.password.js
│   │   ├── items.js
│   │   ├── login.js
│   │   ├── route.js
│   │   ├── user.js
│   │   ├── vehicle.js
│   │   └── service.request.js
│   │
│   └── views/
│       ├── admin.dashboard.html
│       ├── driver.dashboard.html
│       ├── employee.registration.html
│       ├── reports.html
│       ├── service.request.html
│       ├── view.requests.html
│       ├── index.html
│       ├── forgot.password.html
│       └── maintainance.html
│
└── README.md

