import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getUsername } from './utils/LocalStorageUtils';
import { generateTodoList, getTodoList, getCompletedTasks } from './api';
import LoadingSpinner from './components/LoadingSpinner';
import i18n from './i18n';

const AppContext = createContext();

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState(getUsername());
  const [todoList, setTodoList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [hasProcessingTask, setHasProcessingTask] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [language, setLanguage] = useState(i18n.language); // 預設為 i18n 的語言

  const updateProcessingTaskStatus = useCallback((updatedList) => {
    setTodoList(updatedList);
    const hasProcessing = updatedList.some(item => item.done === 'processing');
    setHasProcessingTask(hasProcessing);
  }, []);

  const updateAfterTaskCompletion = useCallback(async (retryCount = 0) => {
    if (username) {
      setIsLoading(true);
      setError(null);
      try {
        const tasks = await getCompletedTasks(username);
        const completedCount = tasks.length;
        const newWeek = Math.floor(completedCount / 7) + 1;
  
        setCompletedTasks(tasks);
        setCurrentWeek(newWeek);
  
        if (completedCount > 0 && completedCount % 7 === 0) {
          await generateTodoList(username);
          let newTodoList = await getTodoList(username);
          
          // 對新生成的列表進行排序
          newTodoList = newTodoList.sort((a, b) => parseInt(a.content.time) - parseInt(b.content.time));
          
          setTodoList(newTodoList);
          updateProcessingTaskStatus(newTodoList);
        } else {
          updateProcessingTaskStatus([]); // 確保沒有任務時更新處理中的狀態
        }
      } catch (error) {
        console.error('Error in updateAfterTaskCompletion:', error);
        setError('Failed to update tasks. Please try again.');
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => updateAfterTaskCompletion(retryCount + 1), RETRY_DELAY);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [username, updateProcessingTaskStatus]);

  const fetchTodoList = useCallback(async (retryCount = 0) => {
    if (username) {
      setIsLoading(true);
      setError(null);
      try {
        let list = await getTodoList(username);
  
        if (list.length === 0) {
          await generateTodoList(username);
          list = await getTodoList(username);
        }
  
        if (list.length === 0 && retryCount < MAX_RETRIES) {
          setTimeout(() => fetchTodoList(retryCount + 1), RETRY_DELAY);
          return;
        }
  
        // 對列表進行排序
        const sortedList = list.sort((a, b) => parseInt(a.content.time) - parseInt(b.content.time));
  
        setTodoList(sortedList);
        updateProcessingTaskStatus(sortedList);
      } catch (error) {
        console.error('Error fetching todo list:', error);
        setError('Failed to fetch todo list. Please try again.');
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => fetchTodoList(retryCount + 1), RETRY_DELAY);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [username, updateProcessingTaskStatus]);

  useEffect(() => {
    if (username) {
      fetchTodoList();
      updateAfterTaskCompletion();
    }
  }, [username, fetchTodoList, updateAfterTaskCompletion]);

  // 更新語言的方法
  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang); // 更新 i18n 的語言
  };

  return (
    <AppContext.Provider value={{
      username,
      setUsername,
      todoList,
      setTodoList,
      completedTasks,
      currentWeek,
      updateProcessingTaskStatus,
      hasProcessingTask,
      isLoading,
      setIsLoading,
      fetchTodoList,
      updateAfterTaskCompletion,
      error,
      language, // 提供語言狀態
      changeLanguage // 提供更改語言的方法
    }}>
      {isLoading && <LoadingSpinner />}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);