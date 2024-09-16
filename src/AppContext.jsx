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
  const [isModalLoading, setIsModalLoading] = useState(false);  // 新增

  const updateProcessingTaskStatus = useCallback((updatedList) => {
    console.log('Updating processing task status with list:', updatedList);
    setTodoList(updatedList);
    const hasProcessing = updatedList.some(item => item.done === 'processing');
    console.log('Has processing task:', hasProcessing);
    setHasProcessingTask(hasProcessing);
  }, []);

  const generateNewTodoList = useCallback(async () => {  // 新增
    if (username) {
      try {
        await generateTodoList(username);
        const newTodoList = await getTodoList(username);
        updateProcessingTaskStatus(newTodoList);
      } catch (error) {
        console.error('Error generating new todo list:', error);
      }
    }
  }, [username, updateProcessingTaskStatus]);

  const updateCompletedTasks = useCallback(async () => {  // 修改
    if (username) {
      setIsLoading(true);
      try {
        const tasks = await getCompletedTasks(username);
        const completedCount = tasks.length;
        const newWeek = Math.floor(completedCount / 7) + 1;

        setCompletedTasks(tasks);
        setCurrentWeek(newWeek);

        if (completedCount > 0 && completedCount % 7 === 0) {
          console.log('Generating new todo list immediately');
          await generateNewTodoList();
        }
      } catch (error) {
        console.error('Error in updateCompletedTasks:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [username, generateNewTodoList]);

  useEffect(() => {
    console.log('AppContext useEffect triggered');
    updateCompletedTasks();
  }, [updateCompletedTasks]);

  useEffect(() => {
    console.log('Current week updated:', currentWeek);
  }, [currentWeek]);

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
      isModalLoading,  // 新增
      setIsModalLoading,  // 新增
      generateNewTodoList  // 新增
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);