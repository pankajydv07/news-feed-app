// src/controllers/news.js
const News = require('../models/News');
const { validationResult } = require('express-validator');

// Get all news with pagination
exports.getAllNews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const news = await News.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await News.countDocuments();
    
    res.status(200).json({
      success: true,
      count: news.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// Get a single news article by ID
exports.getNewsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const news = await News.findById(id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// Get news by category
exports.getNewsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const news = await News.find({ category })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await News.countDocuments({ category });
    
    res.status(200).json({
      success: true,
      count: news.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// Get trending news using aggregation pipeline
exports.getTrendingNews = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Use aggregation pipeline to calculate trending score
    const trendingNews = await News.aggregate([
      // Calculate a trending score based on views, likes, and recency
      {
        $addFields: {
          // Score formula: (views + likes*2) * recency factor
          trendingScore: {
            $multiply: [
              { $add: ["$views", { $multiply: ["$likes", 2] }] },
              {
                $divide: [
                  1,
                  {
                    $add: [
                      1,
                      {
                        $divide: [
                          { $subtract: [new Date(), "$createdAt"] },
                          // Divide by 86400000 (ms in a day) to get days
                          86400000
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      },
      // Sort by trending score in descending order
      { $sort: { trendingScore: -1 } },
      // Limit results
      { $limit: limit },
      // Remove the calculated field from the output
      { $project: { trendingScore: 0 } }
    ]);
    
    res.status(200).json({
      success: true,
      count: trendingNews.length,
      data: trendingNews
    });
  } catch (error) {
    next(error);
  }
};

// Create a new news item
exports.createNews = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const news = new News(req.body);
    await news.save();
    
    // Emit socket event for real-time update
    req.io.emitNewsUpdate(news);
    
    res.status(201).json({
      success: true,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// Update news views
exports.updateNewsViews = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const news = await News.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    next(error);
  }
};

// Like a news item
exports.likeNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const news = await News.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    next(error);
  }
};
