import axios from 'axios';

const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : '/api';
const BASE_URL_V2 = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/v2/api' : '/v2/api';

const tz = -Math.floor(new Date().getTimezoneOffset() / 60);

export const apiBase = axios.create({
  baseURL: process.env.BASE_URL || BASE_URL,
});

export const apiV2Base = axios.create({
  baseURL: process.env.BASE_URL_V2 || BASE_URL_V2,
});

export default {
  getUsers: () => apiBase.get('/users'),
  getRecentGames: () => apiBase.get('/recent_games'),
  getActiveUsers: () => apiBase.get('/active_users'),
  getUser: id => apiBase.get(`/users/${id}?stats=true`),
  getUserGames: (id, mode) => apiBase.get(`/users/${id}/games?m=${mode}`),
  getUserRecords: id => apiBase.get(`/users/${id}/game_records`),
  getKdChart: (id, mode) => apiBase.get(`/users/${id}/kd?m=${mode}`),
  getPlacementChart: id => apiBase.get(`/users/${id}/placements`),
  getGamesPerDayChart: (id, mode) => apiBase.get(`/users/${id}/game_counts?m=${mode}`),
  getTimePlayedChart: id => apiBase.get(`/users/${id}/time_played`),
  postNewUser: username => apiBase.post('/new_user', { username }),
};

export const api2 = {
  getUsers: () => apiV2Base.get('/users?c=1000'),
  // getRecentGames: () => apiV2Base.get('/recent_games'),
  getUser: id => apiV2Base.get(`/users/${id}`),
  getUserGames: (id, mode) => apiV2Base.get(`/users/${id}/games?${mode === 'all' ? '' : `m=${mode}`}`),
  getUserRecords: id => apiV2Base.get(`/users/${id}/records`),
  getKdChart: (id, mode) => apiV2Base.get(`/users/${id}/kd?tz=${tz}&${mode === 'all' ? '' : `m=${mode}`}`),
  getPlacementChart: id => apiV2Base.get(`/users/${id}/placements`),
  getGamesPerDayChart: (id, mode) => apiV2Base.get(`/users/${id}/games_count?tz=${tz}&${mode === 'all' ? '' : `m=${mode}`}`),
  getTimePlayedChart: id => apiV2Base.get(`/users/${id}/time_played`),
  // postNewUser: uid => apiV2Base.post('/new_user', { uid }),
};
