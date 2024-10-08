import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCompletedTask, updateTodoItem } from '../api';
import { useAppContext } from '../AppContext';
import { Modal } from 'bootstrap';

const FinishNowModal = () => {
  const navigate = useNavigate();
  const { username, todoList, updateAfterTaskCompletion, setIsLoading } = useAppContext();
  const [selectedImage, setSelectedImage] = useState('');
  const [comment1, setComment1] = useState('');
  const [comment2, setComment2] = useState('');

  const handleFinish = async () => {
    setIsLoading(true);
    const currentDate = new Date().toISOString().split('T')[0];
    const processingTask = todoList.find(task => task.done === 'processing');
    if (!processingTask) {
      console.error('No processing task found');
      setIsLoading(false);
      return;
    }
    try {
      await addCompletedTask(username, {
        photo: selectedImage,
        comment1,
        comment2,
        title: processingTask.content.title,
        date: currentDate
      });
      await updateTodoItem(username, processingTask.id, 'done');
      await updateAfterTaskCompletion();
      
      // Close the modal
      const modalElement = document.getElementById('now');
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }

      // Navigate to the completed page
      navigate('/completed');
    } catch (error) {
      console.error('Error in finishing task:', error);
    } finally {
      setIsLoading(false);
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
            <h3 className="mb-3">今日の記念 / Record for today</h3>
            <div className="mb-3">
              <div className="row align-items-end">
                <p>兩位的感覺如何？ / 今日の感じは？ / How's your feelings?</p>
                <div className="col-6 py-3">
                  <label className="d-flex flex-column justify-content-center option">
                    <input 
                      type="radio" 
                      name="image" 
                      value="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6iDq1WKRKqZBVPOdzkIT6wvsfxXBchnrhUZfzmeR3tt8WMU6ywXaYWC1JwVX4SsLQWK5fBB7D70Qs3GoqzMl5GUCxuuPvLVPIZCn6g45nlskrpB0QXd8ng2T1jDVdpgmp99_BSXtLLak/s400/date_couple.png"
                      onChange={(e) => setSelectedImage(e.target.value)}
                      required
                    />
                    雙方都很開心 /<br/> 二人とも楽しかった /<br/> Both of us are happy.
                    <div class="ratio ratio-1x1 mt-2">
                      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6iDq1WKRKqZBVPOdzkIT6wvsfxXBchnrhUZfzmeR3tt8WMU6ywXaYWC1JwVX4SsLQWK5fBB7D70Qs3GoqzMl5GUCxuuPvLVPIZCn6g45nlskrpB0QXd8ng2T1jDVdpgmp99_BSXtLLak/s400/date_couple.png" alt="Happy couple"/>
                    </div>
                  </label>
                </div>
                <div className="col-6 py-3">
                  <label className="d-flex flex-column justify-content-center option">
                    <input 
                      type="radio" 
                      name="image" 
                      value="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjMIapwP_zvVLJwATjH-d8cga_jVPuygd3O7Bgtb5ZMs9_1HEzoSziyRvNThXLD3EUKXGH5Tz3OBeMBxS-tpoUplmjNwNVHIb3x5TBZ3-a69GWiIPXFPEdqvNME4l8SMMEZ42MuE05fVZo/s400/couple_okoru_man.png"
                      onChange={(e) => setSelectedImage(e.target.value)}
                      required
                    />
                    男生不開心 / <br/>彼氏は楽しくなかった / <br/>The male partner is not happy.
                    <div class="ratio ratio-1x1 mt-2">
                      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjMIapwP_zvVLJwATjH-d8cga_jVPuygd3O7Bgtb5ZMs9_1HEzoSziyRvNThXLD3EUKXGH5Tz3OBeMBxS-tpoUplmjNwNVHIb3x5TBZ3-a69GWiIPXFPEdqvNME4l8SMMEZ42MuE05fVZo/s400/couple_okoru_man.png" alt="Happy lady"/>
                    </div>
                  </label>
                </div>
                <div className="col-6 py-3">
                  <label className="d-flex flex-column justify-content-center option">
                    <input 
                      type="radio" 
                      name="image" 
                      value="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi20eSwmtjX6ZaBNGUVGR_F6Srox8-cmHH7sCyChVI4-Ctelj-1WbU9MF-5JJx94qpipZIyzDqGGEq_LxXPotlaMOe9epBtMdGsgMLdluopHDyIu-jSA-p7kaC7oBb0M0dHjzd8fH2yUuo/s400/couple_okoru_woman.png"
                      onChange={(e) => setSelectedImage(e.target.value)}
                      required
                    />
                    女生不開心 / <br/>彼女は楽しくなかった / <br/>The female partner is not happy.
                    <div class="ratio ratio-1x1 mt-2">
                      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi20eSwmtjX6ZaBNGUVGR_F6Srox8-cmHH7sCyChVI4-Ctelj-1WbU9MF-5JJx94qpipZIyzDqGGEq_LxXPotlaMOe9epBtMdGsgMLdluopHDyIu-jSA-p7kaC7oBb0M0dHjzd8fH2yUuo/s400/couple_okoru_woman.png" alt="Happy man"/>
                    </div>
                  </label>
                </div>
                <div className="col-6 py-3">
                  <label className="d-flex flex-column justify-content-center option">
                    <input 
                      type="radio" 
                      name="image" 
                      value="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYEYEmYCx1qosBWoFBbqPuQZ5-IHZuheWT3vyNHM5mr7P9XsLq6EKSTfbzsM9alX5wew3wBNqaQP-KVhvMaXgAfp7eBLmloDQvmb8E2hh5X1gasMmZuj-5-iS0XYdAorEWlbyH548CaFk/s400/kenka_couple.png"
                      onChange={(e) => setSelectedImage(e.target.value)}
                      required
                    />
                    雙方都不開心 / <br/>二人とも楽しくなかった / <br/>Both of us are not happy.
                    <div class="ratio ratio-1x1 mt-2">
                      <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYEYEmYCx1qosBWoFBbqPuQZ5-IHZuheWT3vyNHM5mr7P9XsLq6EKSTfbzsM9alX5wew3wBNqaQP-KVhvMaXgAfp7eBLmloDQvmb8E2hh5X1gasMmZuj-5-iS0XYdAorEWlbyH548CaFk/s400/kenka_couple.png" alt="angry couple"/>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="comment1" className="form-label">女生今天的心得 / 彼女今日の感想 / Comment from the female partner</label>
              <textarea 
                className="form-control" 
                id="comment1" 
                rows="3"
                value={comment1}
                onChange={(e) => setComment1(e.target.value)}
                required
              ></textarea>
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="comment2" className="form-label">男生今天的心得 / 彼氏今日の感想 / Comment from the male partner</label>
              <textarea 
                className="form-control" 
                id="comment2" 
                rows="3"
                value={comment2}
                onChange={(e) => setComment2(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-warning me-3" data-bs-dismiss="modal">返回 / 戻る / Return</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleFinish}>提出 / Finished</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishNowModal;