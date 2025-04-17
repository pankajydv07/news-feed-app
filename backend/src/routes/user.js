// src/routes/user.js
const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user');

const router = express.Router();

// Validation middleware
const validateUserData = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('username').notEmpty().withMessage('Username is required')
];

// Routes
router.post('/', validateUserData, userController.createOrUpdateUser);
router.get('/:email', userController.getUserByEmail);
router.patch('/:email/subscriptions', 
  body('subscribedCategories').isArray().withMessage('Subscribed categories must be an array'),
  userController.updateSubscriptions
);

module.exports = router;