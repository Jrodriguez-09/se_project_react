import React from "react";
import "./DeleteModal.css";

function DeleteModal({ isOpen, handleCloseClick, onConfirm }) {
    return (
        <div className={`modal ${isOpen && "modal_opened"}`}>
        <div className="modal__content modal__content-delete">
        <button 
        onClick={handleCloseClick}
        type="button"
        className="modal__close">
        </button>
        <p className="modal__text"> 
        Are you sure you want to delete this item? This action is irreversible.
        </p>
        <div className="modal__delete">
            <button className="modal__confirm" onClick={onConfirm}>
                Yes, delete item
            </button>
            <button className="modal__cancel" onClick={handleCloseClick}>
                Cancel
            </button>
            <button className="modal__close-button" type="button" onClick={handleCloseClick}>
            </button>
           </div>
          </div>
         </div>
    );
}

export default DeleteModal;
