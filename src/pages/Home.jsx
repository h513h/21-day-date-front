import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeartIcon from '../components/HeartIcon';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTodoList, generateTodoList } from '../api';
import { useAppContext } from '../AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { username, todoList, setTodoList, updateProcessingTaskStatus, hasProcessingTask, isLoading, setIsLoading } = useAppContext();

  useEffect(() => {
    const fetchTodoList = async () => {
      if (!username) {
        navigate('/login');
        return;
      }

      setIsLoading(true);
      try {
        let list = await getTodoList(username);
        
        if (list.length === 0) {
          await generateTodoList(username);
          list = await getTodoList(username);
        }

        if (list.length === 0) {
          navigate('/login');
        } else {
          setTodoList(list);
          updateProcessingTaskStatus(list);
        }
      } catch (error) {
        console.error('Error fetching todo list:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodoList();
  }, [username, navigate, setTodoList, updateProcessingTaskStatus, setIsLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!username || todoList.length === 0) {
    return null;
  }

  return (
    <div className="container-sm my-5">
      <Header />
      <Navigation />
      {hasProcessingTask && (
        <div className="alert alert-info m-0 mt-3" role="alert">
          You're in the middle of a challenge right now! Once you've completed it, feel free to explore and take on another one. You're doing great!
        </div>
      )}
      <ul className="main row pt-4 list-unstyled">
        {todoList.map((item) => (
          <HeartIcon key={item.id} item={item} username={username} />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default Home;