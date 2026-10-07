
const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Import Routes
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Mount Routers
app.use('/api/v1/users', userRoutes);

// HEALTH CHECK
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server healthy'
  });
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
