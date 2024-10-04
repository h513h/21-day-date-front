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
      alert(`${`現在沒有正在進行的挑戰！從首頁選一個，和你的伴侶一起創造甜蜜的回憶吧。好好享受彼此的時光！`}\n${`今、どのチャレンジにも取り組んでいません！ホームから一つ選んで、パートナーと一緒に素敵な思い出を作りましょう。楽しんでくださいね！`}\n${`You're not working on any challenge at the moment! Pick one below and create some sweet memories with your partner. Have fun together!`}`);
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
          進行中 / In progress
        </button>
      </li>
      <li className="col-4 p-2">
        <button
          className={`btn w-100 py-2 btn-outline-primary ${isActive('/completed') ? 'btn-primary text-white' : ''}`}
          onClick={() => handleNavigation('/completed')}
          type="button"
        >
          完了 / Completed
        </button>
      </li>
    </ul>
  );
};

export default Navigation;