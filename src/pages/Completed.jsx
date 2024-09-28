import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CompletedModal from '../components/CompletedModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCompletedTasks } from '../api';
import { Modal } from 'bootstrap';
import { useAppContext } from '../AppContext';

const Completed = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { username, isLoading, setIsLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!username) {
        navigate('/login');
        return;
      }
      setIsLoading(true);
      try {
        const tasks = await getCompletedTasks(username);
        setCompletedTasks(tasks);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [username, setIsLoading, navigate]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    const modalElement = document.getElementById('completedTaskModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!username) {
    return <div>Error: Username is not provided</div>;
  }

  return (
    <div className="container-sm my-5">
      <Header />
      <Navigation />
      <div className="main mt-4 container-sm">
        {completedTasks.length === 0 ? (
          <h2>Let's do a date, leave a sweet memory with your partner!</h2>
        ) : (
          <div>
            <p class="mb-2">你們兩位了不起的人一起完成了 {completedTasks.length} 次約會！</p>
            <p class="mb-2">二人の素晴らしいカップルは一緒に {completedTasks.length} 回のデートを完了しました！</p>
            <p>You two amazing people have completed {completedTasks.length} dates together!</p>
            <div className="row mt-3 align-items-end flex-wrap-reverse justify-content-center">
              {completedTasks.map((task, index) => (
                <div 
                  key={index} 
                  className="col-6 col-md-3" 
                  onClick={() => handleTaskClick(task)}
                  role="button"
                >
                  <img className='w-100' src={task.photo} alt={task.title} />
                  <p className="mt-2">{task.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <CompletedModal task={selectedTask} />
      <Footer />
    </div>
  );
};

export default Completed;