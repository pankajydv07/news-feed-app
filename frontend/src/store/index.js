// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import userReducer from '../features/user/userSlice';
import socketMiddleware from './socketMiddleware';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    categories: categoriesReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware)
});

export default store;
