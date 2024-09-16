// src/api.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

const handleResponse = async (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    console.error('API Error:', response.status, response.statusText, response.data);
    throw new Error(response.data.message || 'An error occurred');
  }
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const testServer = () => api.get('/test').then(handleResponse);

export const login = (username, password) => 
  api.post('/login', { username, password }).then(handleResponse);

export const getCompletedTasks = (username) => 
  api.get(`/${username}/completed_tasks`).then(handleResponse);

export const addCompletedTask = (username, taskData) => 
  api.post(`/${username}/completed_tasks`, taskData).then(handleResponse);

export const getTodoList = (username) => 
  api.get(`/${username}/todo_list`).then(handleResponse);

export const generateTodoList = (username) => 
  api.post(`/${username}/generate_todo_list`).then(handleResponse);

export const updateTodoItem = (username, itemId, status) => 
  api.put(`/${username}/todo_list/${itemId}`, { status }).then(handleResponse);

export const editTodoItem = (username, itemId) => 
  api.put(`/${username}/edit_todo_item/${itemId}`).then(handleResponse);

export const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error Response:', error.response.data);
    console.error('API Error Status:', error.response.status);
    console.error('API Error Headers:', error.response.headers);
  } else if (error.request) {
    console.error('API Error Request:', error.request);
  } else {
    console.error('API Error Message:', error.message);
  }
  console.error('API Error Config:', error.config);
  
  throw error;
};