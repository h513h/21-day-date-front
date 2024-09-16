import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FinishNowModal from '../components/FinishNowModal';
import AlreadyFinishedModal from '../components/AlreadyFinishedModal';
import { useAppContext } from '../AppContext';

const Processing = () => {
  const navigate = useNavigate();
  const { username, todoList } = useAppContext();
  
  // 從 todoList 中找出 "done":"processing" 的項目
  const processingItem = todoList.find(item => item.done === 'processing');

  useEffect(() => {
    if (!username) {
      navigate('/login');
    } else if (!processingItem) {
      navigate('/');
    }
  }, [username, processingItem, navigate]);

  if (!username || !processingItem) {
    return null;
  }

  const { content, id } = processingItem;
  let parsedContent;

  try {
    parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
  } catch (error) {
    console.error('Error parsing content:', error);
    return <div>Error processing task data.</div>;
  }

  const { title, steps } = parsedContent;

  return (
    <div className="container-sm my-5">
      <Header />
      <Navigation />
      <div className="main mt-4 row">
        <div className="col-12">
          <h3>{title || 'No Title'}</h3>
          <div className="btns d-flex justify-content-end my-3">
            <button
              className="btn btn-outline-secondary me-3 rounded-2"
              data-bs-toggle="modal"
              data-bs-target="#already"
            >
              Finish before opening the app
            </button>
            <button
              className="btn btn-secondary rounded-2"
              data-bs-toggle="modal"
              data-bs-target="#now"
            >
              Finish NOW
            </button>
          </div>
          <ol>
            {Array.isArray(steps) ? steps.map((step, index) => (
              <li key={index}>{step}</li>
            )) : <li>No steps available</li>}
          </ol>
        </div>
      </div>
      <FinishNowModal username={username} itemId={id} />
      <AlreadyFinishedModal username={username} itemId={id} />
      <Footer />
    </div>
  );
};

export default Processing;