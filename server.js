const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(express.json());

// Custom logger middleware (runs on EVERY incoming request)
app.use(logger);

// Mock Database
let users = [
  { id: 1, name: 'Zaid', role: 'developer' },
  { id: 2, name: 'Sara', role: 'designer' }
];

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server healthy' });
});

// Get Users
app.get('/api/v1/users', (req, res) => {
  res.status(200).json({ success: true, count: users.length, data: users });
});

// Route that intentionally triggers an error to test global error handler
app.get('/api/v1/error-test', (req, res, next) => {
  const error = new Error('Database connection failed simulation!');
  error.statusCode = 500;
  next(error); // Passing error to next() triggers Express global error handler
});

// 404 Route Handler (For invalid URLs)
app.use((req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global Error Handling Middleware (MUST BE AT THE VERY BOTTOM AFTER ALL ROUTES)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});