import "./Header.css";
import logo from "../../../assets/logo.svg";
import avatar from "../../../assets/avatar.png";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, onSignUp, handleLogin }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {currentUser && (
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>
      )}
      {!currentUser && (
        <button 
        type="button"
        className="header__signup-button"
        onClick={onSignUp}
        >
          Signup
        </button>
      )}
      {!currentUser && (
        <button
        type="button"
        className="header__login-button"
        onClick={handleLogin}
        >
          Login
        </button>
      )}
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">{currentUser?.name}</p>
          <div className="header__avatar">
            {currentUser?.avatar ? (
          <img src={currentUser.avatar} alt="User Avatar" className="header__avatar-image" />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : ""}
        </div>
      )}
        </div>
        </div>
      </Link>
    </header>
  );
}

export default Header;
