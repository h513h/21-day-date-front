import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getUsername } from './utils/LocalStorageUtils';
import { generateTodoList, getTodoList, getCompletedTasks } from './api';
import LoadingSpinner from './components/LoadingSpinner';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState(getUsername());
  const [todoList, setTodoList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [hasProcessingTask, setHasProcessingTask] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateProcessingTaskStatus = useCallback((updatedList) => {
    setTodoList(updatedList);
    const hasProcessing = updatedList.some(item => item.done === 'processing');
    setHasProcessingTask(hasProcessing);
  }, []);

  // Function to update completed tasks
  const updateCompletedTasks = useCallback(async () => {
    if (username) {
      setIsLoading(true);
      try {
        const tasks = await getCompletedTasks(username);
        const completedCount = tasks.length;
        const newWeek = Math.floor(completedCount / 7) + 1;

        setCompletedTasks(tasks);
        setCurrentWeek(newWeek);
      } catch (error) {
        console.error('Error in updateCompletedTasks:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [username]);

  // Function to fetch the to-do list
  const fetchTodoList = useCallback(async () => {
    if (username) {
      setIsLoading(true);
      try {
        let list = await getTodoList(username);

        if (list.length === 0) {
          await generateTodoList(username);
          list = await getTodoList(username);
        }

        setTodoList(list);
        updateProcessingTaskStatus(list);
      } catch (error) {
        console.error('Error fetching todo list:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [username, updateProcessingTaskStatus]);

  // Effect to fetch todo list and completed tasks when username changes
  useEffect(() => {
    if (username) {
      fetchTodoList();
      updateCompletedTasks();
    }
  }, [username, fetchTodoList, updateCompletedTasks]);

  // Effect to generate new todo list when completed tasks reach a multiple of 7
  useEffect(() => {
    const completedCount = completedTasks.length;

    if (completedCount > 0 && completedCount % 7 === 0) {
      const newWeek = Math.floor(completedCount / 7) + 1;
      setCurrentWeek(newWeek);

      const generateNewTodoList = async () => {
        try {
          console.log('Generating new todo list as completed tasks reached a multiple of 7...');
          await generateTodoList(username);
          const newTodoList = await getTodoList(username);
          setTodoList(newTodoList);
          updateProcessingTaskStatus(newTodoList);
        } catch (error) {
          console.error('Error generating new todo list:', error);
        }
      };

      generateNewTodoList();
    }
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
      hasProcessingTask,
      isLoading,
      setIsLoading,
      fetchTodoList
    }}>
      {isLoading && <LoadingSpinner />}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);