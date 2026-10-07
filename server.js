
const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Mock Database
let users = [
  { id: 1, name: 'Zaid', role: 'developer' },
  { id: 2, name: 'Sara', role: 'designer' }
];

// HEALTH CHECK
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server healthy'
  });
});

// GET ALL USERS
// Example: GET /api/v1/users
// Example: GET /api/v1/users?role=developer
app.get('/api/v1/users', (req, res) => {
  const { role } = req.query;

  if (role) {
    const filteredUsers = users.filter(
      (u) => u.role === role.toLowerCase()
    );

    return res.status(200).json({
      success: true,
      data: filteredUsers
    });
  }

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// GET SINGLE USER BY ID
// Example: GET /api/v1/users/1
app.get('/api/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// CREATE NEW USER
// Example: POST /api/v1/users
// Body: { "name": "Alex", "role": "engineer" }
app.post('/api/v1/users', (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both name and role'
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    role: role.toLowerCase()
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser
  });
});

// TEST ERROR HANDLER
app.get('/api/v1/error-test', (req, res, next) => {
  const error = new Error('Database connection failed simulation!');
  error.statusCode = 500;

  next(error);
});

// 404 ROUTE HANDLER
app.use((req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;

  next(error);
});

// GLOBAL ERROR HANDLER
app.use(errorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
