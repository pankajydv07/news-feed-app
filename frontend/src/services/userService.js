// src/services/userService.js
import axios from 'axios';
import { API_URL } from '../config';

const getUserByEmail = async (email) => {
  const response = await axios.get(`${API_URL}/api/users/${email}`);
  return response.data;
};

const createOrUpdateUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/users`, userData);
  return response.data;
};

const updateSubscriptions = async (email, subscribedCategories) => {
  const response = await axios.patch(`${API_URL}/api/users/${email}/subscriptions`, {
    subscribedCategories
  });
  return response.data;
};

const userService = {
  getUserByEmail,
  createOrUpdateUser,
  updateSubscriptions
};

export default userService;
