import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);

  const [play, { pause, stop, sound }] = useSound('/audio/completed_audio.mp3', {
    volume: volume,
    onend: () => {
      setIsPlaying(false);
    },
  });

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

  useEffect(() => {
    if (sound) {
      play();
      setIsPlaying(true);
      const fadeIn = setInterval(() => {
        setVolume((v) => {
          if (v < 1) {
            return v + 0.1;
          } else {
            clearInterval(fadeIn);
            return 1;
          }
        });
      }, 100);

      return () => {
        clearInterval(fadeIn);
        stop();
      };
    }
  }, [sound, play, stop]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

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
        <div className="audio-controls mb-3">
          <button onClick={handlePlayPause} className="btn btn-secondary rounded-5 me-2">
          ♬　{isPlaying ? '⏸︎' : '▶'}　
          </button>
        </div>
        {completedTasks.length === 0 ? (
          <h2 class="text-center">Let’s have a date and create a sweet memory together.</h2>
        ) : (
          <div>
            <p className="mb-2">你們兩位了不起的人一起完成了 {completedTasks.length} 次約會！</p>
            <p className="mb-2">二人の素晴らしいカップルは一緒に {completedTasks.length} 回のデートを完了しました！</p>
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