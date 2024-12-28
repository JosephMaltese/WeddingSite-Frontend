import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001', // Replace with API base URL
});

// Use 'http://localhost:5001' for local development
export default instance;