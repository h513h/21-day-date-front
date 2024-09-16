// src/utils/LocalStorageUtils.js

export const setUsername = (username) => {
  localStorage.setItem('username', username);
};

export const getUsername = () => {
  return localStorage.getItem('username');
};

export const removeUsername = () => {
  localStorage.removeItem('username');
};

export const setProcessingTaskId = (taskId) => {
  localStorage.setItem('processingTaskId', taskId);
};

export const getProcessingTaskId = () => {
  return localStorage.getItem('processingTaskId');
};

export const removeProcessingTaskId = () => {
  localStorage.removeItem('processingTaskId');
};

export const setCompletedTasksCount = (count) => {
  localStorage.setItem('completedTasksCount', count.toString());
};

export const getCompletedTasksCount = () => {
  const count = localStorage.getItem('completedTasksCount');
  return count ? parseInt(count, 10) : 0;
};