import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FinishNowModal from '../components/FinishNowModal';
import AlreadyFinishedModal from '../components/AlreadyFinishedModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAppContext } from '../AppContext';
import { Modal } from 'bootstrap';
import { useTranslation } from 'react-i18next';

const Processing = () => {
  const navigate = useNavigate();
  const { username, todoList, isLoading } = useAppContext();
  const [play, { stop }] = useSound('/audio/challenge_audio.mp3', { volume: 0.5 });
  const { t } = useTranslation();
  
  const processingItem = todoList.find(item => item.done === 'processing');

  useEffect(() => {
    if (!username) {
      navigate('/login');
    } else if (!processingItem) {
      navigate('/');
    } else {
      play();
    }

    return () => stop();
  }, [username, processingItem, navigate, play, stop]);

  useEffect(() => {
    const finishNowModal = document.getElementById('now');
    if (finishNowModal) {
      new Modal(finishNowModal);
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

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

  const { title, steps, pic1, pic2 } = parsedContent;

  return (
    <div className="container-sm my-5">
      <Header />
      <Navigation />
      <div className="main my-4 row">
        <div className="col-12 step-font">
          <div className="row align-items-center justify-content-between">
            <div className="col-9">
              <h3 className="mb-3">{title || 'No Title'}</h3>
            </div>
            <div className="col-3 col-md-1">
              <img className="w-100" src={pic1 || "/img/love-letter.jpg"} alt={title || 'No Title'} />
            </div>
          </div>
          <ol>
            {Array.isArray(steps) ? steps.map((step, index) => (
              <li className="pb-3" key={index}>{step}</li>
            )) : <li>No steps available</li>}
          </ol>
          <div className="row justify-content-center">
            <div className="col-5 col-md-2">
              <img className="w-100" src={pic2 || "/img/reward.png"} alt="Reward" />
            </div>
          </div>
          <div className="btns d-flex justify-content-end mt-3">
            <button
              className="btn btn-outline-secondary me-3 rounded-2"
              data-bs-toggle="modal"
              data-bs-target="#already"
            >
              {t('finish_before')}
            </button>
            <button
              className="btn btn-secondary rounded-2"
              data-bs-toggle="modal"
              data-bs-target="#now"
            >
              {t('finish_now')}
            </button>
          </div>
        </div>
      </div>
      <FinishNowModal username={username} itemId={id} />
      <AlreadyFinishedModal username={username} itemId={id} />
      <Footer />
    </div>
  );
};

export default Processing;