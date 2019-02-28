import axios from 'axios';

const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : '/api';

export const apiBase = axios.create({
  baseURL: process.env.BASE_URL || BASE_URL,
});

export default {
  getUsers: () => apiBase.get('/users'),
  getRecentGames: () => apiBase.get('/recent_games'),
  getUser: id => apiBase.get(`/users/${id}`),
  getUserGames: (id, mode) => apiBase.get(`/users/${id}/games?m=${mode}`),
  getUserRecords: id => apiBase.get(`/users/${id}/game_records`),
  getKdChart: (id, mode) => apiBase.get(`/users/${id}/kd?m=${mode}`),
  getPlacementChart: id => apiBase.get(`/users/${id}/placements`),
  getGamesPerDayChart: (id, mode) => apiBase.get(`/users/${id}/game_counts?m=${mode}`),
  getTimePlayedChart: id => apiBase.get(`/users/${id}/time_played`),
};
