import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://smartcartbackend-68sl.onrender.com/smartCart/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
