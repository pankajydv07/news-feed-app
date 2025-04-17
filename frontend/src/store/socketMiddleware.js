// src/store/socketMiddleware.js
import { io } from 'socket.io-client';
import { newsReceived, trendingNewsReceived } from '../features/news/newsSlice';

const socketMiddleware = (store) => {
  let socket;

  return (next) => (action) => {
    const { type, payload } = action;
    
    // Connect to socket when the app initializes
    if (type === 'socket/connect') {
      socket = io(payload.url);
      
      // Set up event listeners
      socket.on('news:update', (news) => {
        store.dispatch(newsReceived(news));
      });
      
      socket.on('news:trending', (news) => {
        store.dispatch(trendingNewsReceived(news));
      });
      
      socket.on('connect', () => {
        console.log('Connected to socket server');
      });
      
      socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });
    }
    
    // Subscribe to categories
    if (type === 'socket/subscribe') {
      if (socket) {
        socket.emit('user:subscribe', payload.categories);
      }
    }
    
    // Disconnect socket
    if (type === 'socket/disconnect') {
      if (socket) {
        socket.disconnect();
      }
    }
    
    return next(action);
  };
};

export default socketMiddleware;
