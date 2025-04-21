import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
//import { defaultClothingItems } from "../../utils/constants";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your Items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          if (item.owner === currentUser._id) {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        } else {
          return null;
        }
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
