import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Profile({ handleCardClick, clothingItems, handleAddClick, onCardLike, handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleSignOut={handleSignOut} 
        currentUser={currentUser}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
