// src/config/index.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb+srv://techyguides8:tCUYecjIdwGgP0Oo@cluster0.xnbcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key'
};
