// src/routes/category.js
const express = require('express');
const router = express.Router();

// Get all available categories
router.get('/', (req, res) => {
  const categories = ['Tech', 'Business', 'Sports', 'Entertainment', 'Science', 'Health'];
  res.status(200).json({
    success: true,
    data: categories
  });
});

module.exports = router;
