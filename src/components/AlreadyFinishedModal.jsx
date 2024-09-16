import React from 'react';
import { updateTodoItem, getTodoList, editTodoItem } from '../api';
import { useAppContext } from '../AppContext';
import { Modal } from 'bootstrap';

const AlreadyFinishedModal = ({ username, itemId }) => {
  const { updateProcessingTaskStatus, todoList, isModalLoading, setIsModalLoading } = useAppContext();

  const handleTryOtherOne = async () => {
    setIsModalLoading(true);
    try {
      const currentTask = todoList.find(item => item.done === 'processing');
      if (!currentTask) {
        console.error('No processing task found');
        return;
      }
      await editTodoItem(username, currentTask.id);
      await updateTodoItem(username, currentTask.id, 'processing');
      const updatedList = await getTodoList(username);
      updateProcessingTaskStatus(updatedList);
    } catch (error) {
      console.error('Error in handleTryOtherOne:', error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleTakeRest = () => {
    const finishNowModal = new Modal(document.getElementById('now'));
    finishNowModal.show();
  };

  return (
    <div className="modal fade" id="already" tabIndex="-1" aria-labelledby="alreadyLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-0 ps-5">
            <h1 className="modal-title fs-5 text-center" id="alreadyLabel">I finished before opening the app.</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-4">
            <div className="d-flex justify-content-around">
              <button type="button" className="btn btn-success px-4" onClick={handleTakeRest} disabled={isModalLoading}>
                Take a rest this time
              </button>
              <button type="button" className="btn btn-warning px-4" onClick={handleTryOtherOne} disabled={isModalLoading}>
                {isModalLoading ? 'Processing...' : 'Try other one!'}
              </button>
            </div>
            {isModalLoading && (
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlreadyFinishedModal;