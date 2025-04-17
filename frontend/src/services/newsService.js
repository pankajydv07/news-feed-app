// src/services/newsService.js
import axios from 'axios';
import { API_URL } from '../config';

const getNews = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/api/news?page=${page}&limit=${limit}`);
  return response.data;
};

const getNewsById = async (id) => {
  const response = await axios.get(`${API_URL}/api/news/${id}`);
  return response.data;
};

const getNewsByCategory = async (category, page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/api/news/category/${category}?page=${page}&limit=${limit}`);
  return response.data;
};

const getTrendingNews = async (limit = 5) => {
  const response = await axios.get(`${API_URL}/api/news/trending?limit=${limit}`);
  return response.data;
};

const updateViews = async (id) => {
  const response = await axios.patch(`${API_URL}/api/news/${id}/view`);
  return response.data;
};

const likeNews = async (id) => {
  const response = await axios.patch(`${API_URL}/api/news/${id}/like`);
  return response.data;
};

const newsService = {
  getNews,
  getNewsById,
  getNewsByCategory,
  getTrendingNews,
  updateViews,
  likeNews
};

export default newsService;
