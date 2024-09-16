import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getUsername } from './utils/LocalStorageUtils';
import { generateTodoList, getTodoList, getCompletedTasks } from './api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState(getUsername());
  const [todoList, setTodoList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [hasProcessingTask, setHasProcessingTask] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setGlobalLoading = (loading) => {
    setIsLoading(loading);
  };

  const updateProcessingTaskStatus = useCallback((updatedList) => {
    console.log('Updating processing task status with list:', updatedList);
    setTodoList(updatedList);
    const hasProcessing = updatedList.some(item => item.done === 'processing');
    console.log('Has processing task:', hasProcessing);
    setHasProcessingTask(hasProcessing);
  }, []);

  const updateCompletedTasks = useCallback(async () => {
    if (username) {
      setIsLoading(true);
      console.log('Updating completed tasks for user:', username);
      try {
        const tasks = await getCompletedTasks(username);
        console.log('Fetched completed tasks:', tasks);
        setCompletedTasks(tasks);
        const completedCount = tasks.length;
        console.log('Completed tasks count:', completedCount);
        const newWeek = Math.floor(completedCount / 7) + 1;
        console.log('Calculated new week:', newWeek);
        setCurrentWeek(newWeek);

        if (completedCount > 0 && completedCount % 7 === 0) {
          console.log('Generating new todo list');
          await generateTodoList(username);
          const newTodoList = await getTodoList(username);
          console.log('New todo list:', newTodoList);
          updateProcessingTaskStatus(newTodoList);
        }
      } catch (error) {
        console.error('Error in updateCompletedTasks:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [username, updateProcessingTaskStatus]);

  useEffect(() => {
    console.log('AppContext useEffect triggered');
    updateCompletedTasks();
  }, [updateCompletedTasks]);

  useEffect(() => {
    console.log('Current week updated:', currentWeek);
  }, [currentWeek]);

  const refreshTodoList = useCallback(async () => {
    if (username) {
      setIsLoading(true);
      try {
        const list = await getTodoList(username);
        setTodoList(list);
        updateProcessingTaskStatus(list);
      } catch (error) {
        console.error('Error refreshing todo list:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [username, updateProcessingTaskStatus]);

  return (
    <AppContext.Provider value={{
      username,
      setUsername,
      todoList,
      setTodoList,
      completedTasks,
      updateCompletedTasks,
      currentWeek,
      updateProcessingTaskStatus,
      hasProcessingTask,
      isLoading,
      setGlobalLoading,
      refreshTodoList
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);