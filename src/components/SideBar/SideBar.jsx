import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={currentUser.avatar} alt="Avatar" />
      <p className="sidebar__username">{currentUser.name}</p>
    <div className="sidebar__edit-profile">
      <button
      type="button"
      className="sidebar__edit-button"
      onClick={handleEditProfileClick}>
        Edit Profile 
      </button>
      <button
      type="button"
      className="sidebar__logout-button"
      onClick={handleSignOut}>
        Logout
      </button>
      </div>
    </div>
  );
}

export default SideBar;
