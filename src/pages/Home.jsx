import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeartIcon from '../components/HeartIcon';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAppContext } from '../AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { username, todoList, hasProcessingTask, isLoading, fetchTodoList } = useAppContext();

  useEffect(() => {
    console.log("username:", username);
    console.log("todoList:", todoList);
    console.log("isLoading:", isLoading);
    if (!username) {
      navigate('/login');
      return;
    }
    // 使用 AppContext 中的 fetchTodoList 方法
    fetchTodoList();
  }, [username, todoList, isLoading,navigate, fetchTodoList]);

  if (isLoading) {
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