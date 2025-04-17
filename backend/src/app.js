// src/app.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { setupSocketIO } = require('./socket');
const config = require('./config');

// Import routes
const newsRoutes = require('./routes/news');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user');

// Initialize express app
const app = express();
const server = http.createServer(app);

// Setup socket.io
const io = setupSocketIO(server);

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API routes
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Connect to MongoDB with retry logic
const connectWithRetry = async (retryCount = 0, maxRetries = 5) => {
  try {
    console.log(`MongoDB connection attempt ${retryCount + 1}...`);
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
    
    // Start the server after successful connection
    server.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    
    if (retryCount < maxRetries) {
      console.log(`Retrying in 5 seconds... (${retryCount + 1}/${maxRetries})`);
      setTimeout(() => connectWithRetry(retryCount + 1, maxRetries), 5000);
    } else {
      console.error('Max retry attempts reached. Exiting process.');
      process.exit(1);
    }
  }
};

// Start server with connection retry
connectWithRetry();

module.exports = { app, server };
