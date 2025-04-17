// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Default error status and message
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    
    res.status(status).json({
      success: false,
      error: {
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      }
    });
  };
  
  module.exports = errorHandler;
  