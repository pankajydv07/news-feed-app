// src/config.js
// Configuration variables for the application

// API URL - Dynamically set based on environment
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Socket connection path
export const SOCKET_PATH = '/socket.io';

// News pagination limit
export const DEFAULT_PAGE_LIMIT = 10;

// Image placeholder
export const DEFAULT_IMAGE = 'https://via.placeholder.com/300x200?text=News+Image';