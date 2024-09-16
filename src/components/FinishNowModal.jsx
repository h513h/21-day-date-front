import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCompletedTask, updateTodoItem, getTodoList } from '../api';
import { useAppContext } from '../AppContext';

const FinishNowModal = () => {
  const navigate = useNavigate();
  const { username, todoList, updateProcessingTaskStatus, completedTasksCount, updateCompletedTasksCount } = useAppContext();
  const [selectedImage, setSelectedImage] = useState('');
  const [comment1, setComment1] = useState('');
  const [comment2, setComment2] = useState('');

  const handleFinish = async () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const processingTask = todoList.find(task => task.done === 'processing');

    if (!processingTask) {
      console.error('No processing task found');
      return;
    }

    try {
      // 1. Add completed task
      await addCompletedTask(username, {
        photo: selectedImage,
        comment1,
        comment2,
        title: processingTask.content.title,
        date: currentDate
      });

      // 2. Update todo item to 'done'
      await updateTodoItem(username, processingTask.id, 'done');

      // 3. Get updated todo list
      const updatedList = await getTodoList(username);
      updateProcessingTaskStatus(updatedList);

      // 4. Update completed tasks count
      updateCompletedTasksCount(completedTasksCount + 1);

      // 5. Navigate to completed page
      navigate('/completed');
    } catch (error) {
      console.error('Error in finishing task:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="modal fade" id="now" tabIndex="-1" aria-labelledby="nowLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body p-4">
            <div className="d-flex justify-content-end">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <h3 className="mb-3">Record for today</h3>
            <div className="mb-3">
              <div className="row align-items-end">
                <p>How's your feelings?</p>
                {/* Image options remain the same, just add onChange handler */}
                <div className="col-6 option py-3">
                  <label className="d-flex justify-content-center">
                    <input 
                      type="radio" 
                      name="image" 
                      value="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6iDq1WKRKqZBVPOdzkIT6wvsfxXBchnrhUZfzmeR3tt8WMU6ywXaYWC1JwVX4SsLQWK5fBB7D70Qs3GoqzMl5GUCxuuPvLVPIZCn6g45nlskrpB0QXd8ng2T1jDVdpgmp99_BSXtLLak/s400/date_couple.png"
                      onChange={(e) => setSelectedImage(e.target.value)}
                    />
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6iDq1WKRKqZBVPOdzkIT6wvsfxXBchnrhUZfzmeR3tt8WMU6ywXaYWC1JwVX4SsLQWK5fBB7D70Qs3GoqzMl5GUCxuuPvLVPIZCn6g45nlskrpB0QXd8ng2T1jDVdpgmp99_BSXtLLak/s400/date_couple.png" alt="Happy couple"/>
                  </label>
                </div>
                <div className="col-6 option py-3">
                  <label className="d-flex justify-content-center">
                    <input 
                      type="radio" 
                      name="image" 
                      value="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjMIapwP_zvVLJwATjH-d8cga_jVPuygd3O7Bgtb5ZMs9_1HEzoSziyRvNThXLD3EUKXGH5Tz3OBeMBxS-tpoUplmjNwNVHIb3x5TBZ3-a69GWiIPXFPEdqvNME4l8SMMEZ42MuE05fVZo/s400/couple_okoru_man.png"
                      onChange={(e) => setSelectedImage(e.target.value)}
                    />
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjMIapwP_zvVLJwATjH-d8cga_jVPuygd3O7Bgtb5ZMs9_1HEzoSziyRvNThXLD3EUKXGH5Tz3OBeMBxS-tpoUplmjNwNVHIb3x5TBZ3-a69GWiIPXFPEdqvNME4l8SMMEZ42MuE05fVZo/s400/couple_okoru_man.png" alt="Happy lady"/>
                  </label>
                </div><div className="col-6 option py-3">
                  <label className="d-flex justify-content-center">
                    <input 
                      type="radio" 
                      name="image" 
                      value="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi20eSwmtjX6ZaBNGUVGR_F6Srox8-cmHH7sCyChVI4-Ctelj-1WbU9MF-5JJx94qpipZIyzDqGGEq_LxXPotlaMOe9epBtMdGsgMLdluopHDyIu-jSA-p7kaC7oBb0M0dHjzd8fH2yUuo/s400/couple_okoru_woman.png"
                      onChange={(e) => setSelectedImage(e.target.value)}
                    />
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi20eSwmtjX6ZaBNGUVGR_F6Srox8-cmHH7sCyChVI4-Ctelj-1WbU9MF-5JJx94qpipZIyzDqGGEq_LxXPotlaMOe9epBtMdGsgMLdluopHDyIu-jSA-p7kaC7oBb0M0dHjzd8fH2yUuo/s400/couple_okoru_woman.png" alt="Happy man"/>
                  </label>
                </div><div className="col-6 option py-3">
                  <label className="d-flex justify-content-center">
                    <input 
                      type="radio" 
                      name="image" 
                      value="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYEYEmYCx1qosBWoFBbqPuQZ5-IHZuheWT3vyNHM5mr7P9XsLq6EKSTfbzsM9alX5wew3wBNqaQP-KVhvMaXgAfp7eBLmloDQvmb8E2hh5X1gasMmZuj-5-iS0XYdAorEWlbyH548CaFk/s400/kenka_couple.png"
                      onChange={(e) => setSelectedImage(e.target.value)}
                    />
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYEYEmYCx1qosBWoFBbqPuQZ5-IHZuheWT3vyNHM5mr7P9XsLq6EKSTfbzsM9alX5wew3wBNqaQP-KVhvMaXgAfp7eBLmloDQvmb8E2hh5X1gasMmZuj-5-iS0XYdAorEWlbyH548CaFk/s400/kenka_couple.png" alt="angry couple"/>
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="comment1" className="form-label">Comment from Lady</label>
              <textarea 
                className="form-control" 
                id="comment1" 
                rows="3"
                value={comment1}
                onChange={(e) => setComment1(e.target.value)}
              ></textarea>
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="comment2" className="form-label">Comment from Gentleman</label>
              <textarea 
                className="form-control" 
                id="comment2" 
                rows="3"
                value={comment2}
                onChange={(e) => setComment2(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-warning me-3" data-bs-dismiss="modal">Return</button>
              <button type="button" className="btn btn-success"  data-bs-dismiss="modal" onClick={handleFinish}>Finished</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishNowModal;