import axios from 'axios';
import * as api from './api.js';

export const db = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const client = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  params: {
    key: api.YOUTUBE,
  },
});
