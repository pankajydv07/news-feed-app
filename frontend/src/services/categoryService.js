// src/services/categoryService.js
import axios from 'axios';
import { API_URL } from '../config';

const getCategories = async () => {
  const response = await axios.get(`${API_URL}/api/categories`);
  return response.data;
};

const categoryService = {
  getCategories
};

export default categoryService;
