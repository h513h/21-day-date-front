import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateTodoItem, getTodoList } from '../api';
import { useAppContext } from '../AppContext';

const colors = ['#cb93bf', '#c293a3', '#ad8478', '#fad1ad', '#e2a772', '#eadcce', '#e49793', '#f6aaa6', '#eec7de'];

const HeartIcon = ({ item, username }) => {
  const navigate = useNavigate();
  const [color, setColor] = useState('');
  const { hasProcessingTask, updateProcessingTaskStatus, setIsLoading } = useAppContext();

  useEffect(() => {
    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };

    setColor(getRandomColor());
  }, [item.id]);

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (item.done === 'done') {
      alert("You did it! Great job! Now, why not try another and keep the fun going?");
      return;
    }

    if (hasProcessingTask && item.done !== 'processing') {
      alert("You're almost there! Let's finish this challenge first, then you can unlock the next adventure. Keep going, you're doing amazing!");
      return;
    }

    if (item.done === 'yet' || item.done === null) {
      setIsLoading(true);
      try {
        await updateTodoItem(username, item.id, 'processing');
        const updatedList = await getTodoList(username);
        updateProcessingTaskStatus(updatedList);
        navigate('/processing', { state: { item } });
      } catch (error) {
        console.error('Error updating item status:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <li className="col-4 py-4">
      <div className="estimate text-center">約 {item.content.time} 分鐘 / 約 {item.content.time} 分</div>
      <div className="estimate text-center mb-3">Around {item.content.time} mins</div>
      <div 
        className={`heart-icon d-flex justify-content-center ${item.done === 'done' ? 'completed' : ''} ${hasProcessingTask && item.done !== 'processing' ? 'disabled' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick(e);
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        <svg
          className="heart-svg"
          width="84"
          height="75"
          viewBox="0 0 84 75"
          fill={item.done === 'done' ? '#c36462' : color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M48.9455 71.8321C47.8572 72.8842 46.7754 73.9392 45.7066 75C45.6002 74.9199 45.4946 74.8405 45.3882 74.7597C28.0765 61.6755 4.32306 49.6701 0.4206 25.4103C-0.926048 17.0432 0.804105 6.95512 7.89843 2.93359C14.8451 -1.00495 23.5379 2.72864 29.7154 7.89753C35.0072 12.3253 39.4994 17.8103 42.8823 23.9735C45.7652 18.7173 48.6836 13.4114 52.6179 8.97635C56.5529 4.54206 61.6537 0.99173 67.3623 0.166931C71.2206 -0.390152 75.3871 0.416603 78.3757 3.04759C80.2737 4.7174 81.5979 7.02005 82.488 9.45116C84.6863 15.4586 84.3245 22.2662 82.4503 28.3948C80.5769 34.5235 77.2816 40.0611 73.6758 45.2596C66.753 55.238 57.618 63.4521 48.9455 71.8321Z" />
        </svg>
      </div>
    </li>
  );
};

export default HeartIcon;