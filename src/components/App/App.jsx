import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ItemModal from "./ItemModal/ItemModal";
import Footer from "./Footer/Footer";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, addItems, deleteItems, editProfile, addCardLike, removeCardLike } from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { signUp, signIn, getUserInfo } from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import DeleteModal from "../DeleteModal/DeleteModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleOnLoginClick = () => {
    setActiveModal("login");
  };

  const handleOnSignUpClick = () => {
    setActiveModal("signup");
  };

  const handleEidtProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-item")
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    
    !isLiked 
      ? addCardLike(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
        cards.map((item) => 
          item._id === id ? { ...item, ...updatedCard } : item))
  })
    .catch((err) => console.log(err))
    : removeCardLike(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
        cards.map((item) => item._id === id ? { ...item, ...updatedCard } : item))
  })
    .catch((err) => console.log(err));
}

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    editProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser((user) => ({ ...user, ...updatedUser }));
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleProfileLogin = ({ email, password }) => {
    setIsLoading(true);
    signIn({ email, password })
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      return getUserInfo(res.token);
    })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
      }) 
      .catch((err) => console.log(err))
      ,fianlly(() => setIsLoading(false));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoading(true);
    signUp({ name, avatar, email, password })
    .then(() => signIn({ email, password }))
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      return getUserInfo(res.token);
    })
    .then((userData) => {
      setCurrentUser(userData);
      setIsLoggedIn(true);
      closeActiveModal();
    }) 
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    if(!token) return;
    addItems({ name, imageUrl, weather }, token)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = () => {
    const token = localStorage.getItem("jwt");
    if(!token) return;
    deleteItems(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider
      value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header 
            handleAddClick={handleAddClick} 
            weatherData={weatherData} 
            isLoggedIn={isLoggedIn}
            onSignUp={handleOnSignUpClick}
            handleLogin={handleOnLoginClick}
            />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  handleSignOut={handleSignOut}
                  handleEditProfileClick={handleEidtProfileClick}
                  onCardLike={handleCardLike}
                />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          handleCloseClick={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeActiveModal}
          handleCardDelete={handleDeleteClick}
        />
        <RegisterModal
          isOpen={activeModal === "signup"}
          onRegister={handleRegister}
          isLoading={isLoading}
          handleCloseClick={closeActiveModal}
          handleLoginClick={handleOnLoginClick}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleProfileLogin}
            isLoading={isLoading}
            handleCloseClick={closeActiveModal}
            handleRegisterClick={handleOnSignUpClick}
            />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            handleCloseClick={closeActiveModal} 
            onEditProfile={handleEditProfile}
          />  
          <DeleteModal
          isOpen={activeModal === "delete-item"}
          handleCloseClick={closeActiveModal}
          onConfirm={handleCardDelete}
          />
      </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
