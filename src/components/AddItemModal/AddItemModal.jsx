import "./AddItemModal.css";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

const AddItemModal = ({ isOpen, handleCloseClick, onAddItemModalSubmit }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          name="name"
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          name="link"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value={"hot"}
            onChange={handleWeatherChange}
            //checked={weather === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value={"warm"}
            onChange={handleWeatherChange}
            //checked={weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value={"cold"}
            onChange={handleWeatherChange}
            //checked={weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
