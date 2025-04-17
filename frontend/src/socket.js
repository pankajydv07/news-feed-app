// src/socket.js
import { io } from 'socket.io-client';
import { API_URL } from './config';

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(API_URL);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToCategories = (categories) => {
  if (socket) {
    socket.emit('user:subscribe', categories);
  }
};

export default {
  initSocket,
  disconnectSocket,
  subscribeToCategories
};
