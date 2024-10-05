import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeartIcon from '../components/HeartIcon';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAppContext } from '../AppContext';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const Home = () => {
  const navigate = useNavigate();
  const { username, todoList, hasProcessingTask, isLoading, fetchTodoList } = useAppContext();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!username) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        await fetchTodoList();
        if (todoList.length === 0 && retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prevCount => prevCount + 1);
          }, RETRY_DELAY);
        }
      } catch (error) {
        console.error('Failed to fetch todo list:', error);
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prevCount => prevCount + 1);
          }, RETRY_DELAY);
        }
      }
    };

    fetchData();
  }, [username, navigate, fetchTodoList, todoList.length, retryCount]);

  if (isLoading || (todoList.length === 0 && retryCount < MAX_RETRIES)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-sm my-5">
      <Header />
      <Navigation />
      {hasProcessingTask && (
        <div className="alert alert-info m-0 mt-3" role="alert">
          正好在挑戰的過程中！完成後，隨時可以去嘗試下一個挑戰。你們表現得非常出色！<br/>
          現在、挑戦中ですね！終わったら、ぜひ新しいチャレンジにも挑戦してみてください。絶好調ですよ！<br/>
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