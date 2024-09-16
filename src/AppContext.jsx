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

  const updateCompletedTasks = useCallback(async () => {
    if (username) {
      try {
        const tasks = await getCompletedTasks(username);
        setCompletedTasks(tasks);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    }
  }, [username]);

  const updateProcessingTaskStatus = useCallback((updatedList) => {
    setTodoList(updatedList);
    const hasProcessing = updatedList.some(item => item.done === 'processing');
    setHasProcessingTask(hasProcessing);
  }, []);

  useEffect(() => {
    updateCompletedTasks();
  }, [updateCompletedTasks]);

  useEffect(() => {
    const completedCount = completedTasks.length;
    setCurrentWeek(Math.floor(completedCount / 7) + 1);

    const handleWeekChangeAndGenerateList = async () => {
      if (completedCount > 0 && completedCount % 7 === 0) {
        try {
          await generateTodoList(username);
          const newTodoList = await getTodoList(username);
          updateProcessingTaskStatus(newTodoList);
        } catch (error) {
          console.error('Error generating new todo list:', error);
        }
      }
    };

    handleWeekChangeAndGenerateList();
  }, [completedTasks, username, updateProcessingTaskStatus]);

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
      hasProcessingTask
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);