import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { todoList } = useAppContext();

  const isActive = (path) => location.pathname === path;
  const hasProcessingTask = todoList.some(item => item.done === 'processing');

  const handleNavigation = (path) => {
    if (path === '/processing' && !hasProcessingTask) {
      alert("You're not working on any challenge at the moment! Pick one below and create some sweet memories with your partner. Have fun together!");
    } else {
      navigate(path);
    }
  };

  return (
    <ul className="nav row text-center mt-3">
      <li className="col-4 p-2">
        <button
          className={`w-100 py-2 btn btn-outline-primary ${isActive('/') ? 'btn-primary text-white' : ''}`}
          onClick={() => handleNavigation('/')}
          type="button"
        >
          Home
        </button>
      </li>
      <li className="col-4 p-2" onClick={() => handleNavigation('/processing')}>
        <button
          className={`btn w-100 py-2 btn-outline-primary ${isActive('/processing') ? 'btn-primary text-white' : ''}`}
          disabled={!hasProcessingTask}
          type="button"
        >
          In progress
        </button>
      </li>
      <li className="col-4 p-2">
        <button
          className={`btn w-100 py-2 btn-outline-primary ${isActive('/completed') ? 'btn-primary text-white' : ''}`}
          onClick={() => handleNavigation('/completed')}
          type="button"
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

export default Navigation;