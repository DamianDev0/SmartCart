import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.1.5:4000/smartCart/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
  