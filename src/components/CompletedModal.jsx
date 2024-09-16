import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

const CompletedModal = ({ task }) => {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (modalRef.current && !modalInstance.current) {
      modalInstance.current = new Modal(modalRef.current);
    }
    
    return () => {
      if (modalInstance.current) {
        modalInstance.current.dispose();
      }
    };
  }, []);

  if (!task) return null;

  return (
    <div className="modal fade" ref={modalRef} id="completedTaskModal" tabIndex="-1" aria-labelledby="completedTaskModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body p-4">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <h3>{task.date}</h3>
            <h3>{task.title}</h3>
            <div className="row">
              <div className="col-3">
                <img src={task.photo} alt={task.title} className="img-fluid" />
              </div>
            </div>

            <p className="text-break mt-3">{task.comment1}</p>
            <hr />
            <p className="text-break">{task.comment2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedModal;
