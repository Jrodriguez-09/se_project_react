import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const itemLikeButton = `like__button ${isLiked ? "like__button-active" : ""}`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser && (
        <button onClick={handleLike} className={itemLikeButton}></button>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
