import "./ItemModal.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, handleCloseClick, card, onDeleteItem, }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner?._id === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
        <button
          className="modal__delete-button"
          type="button"
          onClick={() => onDeleteItem(card._id)}
        >
          Delete Item
        </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
