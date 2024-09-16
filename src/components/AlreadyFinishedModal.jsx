import React from 'react';
import { updateTodoItem, getTodoList, editTodoItem } from '../api';
import { useAppContext } from '../AppContext';
import { Modal } from 'bootstrap';

const AlreadyFinishedModal = ({ username, itemId }) => {
  const { updateProcessingTaskStatus, todoList } = useAppContext();

  const handleTryOtherOne = async () => {
    console.log('handleTryOtherOne clicked. Username:', username, 'ItemId:', itemId);
    try {
      // 1. 獲取當前 processing 任務
      const currentTask = todoList.find(item => item.done === 'processing');
      console.log('Current task:', currentTask);

      if (!currentTask) {
        console.error('No processing task found');
        return;
      }
      // replace current task
      await editTodoItem(username, currentTask.id)

      // 2. 更新任務狀態至 "processing"
      await updateTodoItem(username, currentTask.id, 'processing');

      // 3. 取得最新的任務清單
      const updatedList = await getTodoList(username);

      // 4. 更新應用程序上下文中的處理任務狀態
      updateProcessingTaskStatus(updatedList);

    } catch (error) {
      console.error('Error in handleTryOtherOne:', error);
    }
  };

  const handleTakeRest = () => {
    // 打開 FinishNowModal
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
              <button type="button" className="btn btn-success px-4"  data-bs-dismiss="modal" aria-label="Close" onClick={handleTakeRest}>
                Take a rest this time
              </button>
              <button type="button" className="btn btn-warning px-4"  data-bs-dismiss="modal" aria-label="Close" onClick={handleTryOtherOne}>Try other one!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlreadyFinishedModal;
