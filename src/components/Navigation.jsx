import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { todoList } = useAppContext();
  const { t } = useTranslation();

  const isActive = (path) => location.pathname === path;
  const hasProcessingTask = todoList.some(item => item.done === 'processing');

  const handleNavigation = (path) => {
    if (path === '/processing' && !hasProcessingTask) {
      alert(t('no_processing_task_alert'));
    } else {
      navigate(path);
    }
  };

  return (
    <ul className="nav row text-center mt-3 align-items-stretch">
      <li className="col-4 p-2">
        <button
          className={`h-100 w-100 py-2 btn btn-outline-primary ${isActive('/') ? 'btn-primary text-white' : ''}`}
          onClick={() => handleNavigation('/')}
          type="button"
        >
         {t('home')}
        </button>
      </li>
      <li className="col-4 p-2" onClick={() => handleNavigation('/processing')}>
        <button
          className={`btn h-100 w-100 py-2 btn-outline-primary ${isActive('/processing') ? 'btn-primary text-white' : ''}`}
          disabled={!hasProcessingTask}
          type="button"
        >
          {t('in_progress')}
        </button>
      </li>
      <li className="col-4 p-2">
        <button
          className={`btn h-100 w-100 py-2 btn-outline-primary ${isActive('/completed') ? 'btn-primary text-white' : ''}`}
          onClick={() => handleNavigation('/completed')}
          type="button"
        >
          {t('completed')}
        </button>
      </li>
    </ul>
  );
};

export default Navigation;