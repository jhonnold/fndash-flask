import axios from 'axios';

const BASE_URL = '/api';

export const apiBase = axios.create({
  baseURL: process.env.BASE_URL || BASE_URL,
});

export default {
  // Added api calls here
  // getSomething: () => apiBase.get(url),
};