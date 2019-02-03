import axios from 'axios';

const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : '/api';

export const apiBase = axios.create({
  baseURL: process.env.BASE_URL || BASE_URL,
});

export default {
  getUsers: () => apiBase.get('/users'),
};
