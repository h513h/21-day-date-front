import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CompletedModal from '../components/CompletedModal';
import { getCompletedTasks } from '../api';
import { Modal } from 'bootstrap';

const Completed = ({ username }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!username) {
        console.error('Username is not provided');
        return;
      }
      try {
        const tasks = await getCompletedTasks(username);
        setCompletedTasks(tasks);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };

    fetchTasks();
  }, [username]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    const modalElement = document.getElementById('completedTaskModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.show();
    }
  };

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
          <div className="row mt-3 align-items-end flex-row-reverse justify-content-end">
            <p>You two lovely souls have completed {completedTasks.length} dates together!</p>
            {completedTasks.map((task, index) => (
              <div 
                key={index} 
                className="col-6 col-md-3" 
                onClick={() => handleTaskClick(task)}
                 role="button"
              >
                <img className='w-100' src={task.photo} alt={task.title} />
                <p class="mt-2">{task.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <CompletedModal task={selectedTask} />
      <Footer />
    </div>
  );
};

export default Completed;
