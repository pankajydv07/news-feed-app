// src/routes/news.js
const express = require('express');
const { body } = require('express-validator');
const newsController = require('../controllers/news');

const router = express.Router();

// Validation middleware
const validateNewsCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('summary').notEmpty().withMessage('Summary is required'),
  body('category').isIn(['Tech', 'Business', 'Sports', 'Entertainment', 'Science', 'Health'])
    .withMessage('Valid category is required'),
  body('source').notEmpty().withMessage('Source is required'),
  body('author').notEmpty().withMessage('Author is required')
];

// Routes
router.get('/', newsController.getAllNews);
router.get('/trending', newsController.getTrendingNews);
router.get('/category/:category', newsController.getNewsByCategory);
router.get('/:id', newsController.getNewsById);
router.post('/', validateNewsCreation, newsController.createNews);
router.patch('/:id/view', newsController.updateNewsViews);
router.patch('/:id/like', newsController.likeNews);

module.exports = router;
