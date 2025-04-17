// src/controllers/user.js
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Create or update user
exports.createOrUpdateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, username, subscribedCategories } = req.body;
    
    // Find user by email or create a new one
    let user = await User.findOne({ email });
    
    if (user) {
      // Update existing user
      user.username = username || user.username;
      user.subscribedCategories = subscribedCategories || user.subscribedCategories;
      await user.save();
    } else {
      // Create new user
      user = new User({
        email,
        username,
        subscribedCategories: subscribedCategories || []
      });
      await user.save();
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Get user by email
exports.getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    
    const user = await User.findOne({ email });
    
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
  } catch (error) {
    next(error);
  }
};

// Update user subscriptions
exports.updateSubscriptions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email } = req.params;
    const { subscribedCategories } = req.body;
    
    const user = await User.findOneAndUpdate(
      { email },
      { subscribedCategories },
      { new: true }
    );
    
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
  } catch (error) {
    next(error);
  }
};
