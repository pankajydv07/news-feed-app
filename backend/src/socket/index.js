// src/socket/index.js
const socketIO = require('socket.io');
const News = require('../models/News');

const setupSocketIO = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Socket.io connection handler
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    // Handle user subscription to categories
    socket.on('user:subscribe', (categories) => {
      console.log(`User ${socket.id} subscribed to categories:`, categories);
      
      // Leave all category rooms first
      ['Tech', 'Business', 'Sports', 'Entertainment', 'Science', 'Health'].forEach(category => {
        socket.leave(category);
      });
      
      // Join the selected category rooms
      categories.forEach(category => {
        socket.join(category);
      });
      
      socket.emit('user:subscribed', categories);
    });
    
    // Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // Function to emit news updates to subscribed clients
  const emitNewsUpdate = async (news) => {
    // Emit to specific category room
    io.to(news.category).emit('news:update', news);
    
    // Also emit to a general feed
    io.emit('news:all', news);
    
    // Check if news is trending and emit to trending feed
    const isTrending = await checkIfTrending(news._id);
    if (isTrending) {
      io.emit('news:trending', news);
    }
  };

  // Helper function to check if news is trending
  const checkIfTrending = async (newsId) => {
    try {
      const newsItem = await News.findById(newsId);
      // Simple trending algorithm: views + (likes * 2) > 100
      return (newsItem.views + (newsItem.likes * 2)) > 100;
    } catch (error) {
      console.error('Error checking trending status:', error);
      return false;
    }
  };

  return { io, emitNewsUpdate };
};

module.exports = { setupSocketIO };
