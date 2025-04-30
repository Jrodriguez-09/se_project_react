import { useEffect, useState } from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, handleCloseClick, onRegister, handleLoginClick, isLoading }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ email, password, name, avatar });
    };

    useEffect(() => {
        if (isOpen) {
          setEmail("");
          setPassword("");
          setName("");
          setAvatar("");
        }
    }, [isOpen]);

    return (
      <ModalWithForm
        title="Sign Up"
        buttonText={isLoading ? "Signing Up..." : "Next"}
        isOpen={isOpen}
        handleCloseClick={handleCloseClick}
        onSubmit={handleSubmit}
      >
        <label htmlFor="email-register" className="modal__label">
          Email{""}
          <input
            type="email"
            className="modal__input"
            id="email-register"
            placeholder="Email"
            required
            name="email"
            onChange={handleEmailChange}
            value={email}
          />
        </label>
        <label htmlFor="password-register" className="modal__label">
          Password{""}
          <input
            type="password"
            className="modal__input"
            id="password-register"
            placeholder="Password"
            required
            name="password"
            minLength="1"
            maxLength="20"
            onChange={handlePasswordChange}
            value={password}
          />
        </label>
        <label htmlFor="name-register" className="modal__label">
          Name{""}
          <input
            type="text"
            className="modal__input"
            id="name-register"
            placeholder="Name"
            required
            name="name"
            minLength="1"
            maxLength="30"
            onChange={handleNameChange}
            value={name}
          />
        </label>
        <label htmlFor="avatarUrl-register" className="modal__label">
          Avatar URL{""}
          <input
            type="url"
            className="modal__input"
            id="avatarUrl-register"
            placeholder="Avatar URL"
            required
            name="avatar"
            onChange={handleAvatarChange}
            value={avatar} 
          />
        </label>
        <div className="modal__button-container">
            <button
             type="button"
             className="modal__login"
             onClick={handleLoginClick}
            >
              Or Login
            </button>
        </div>   
      </ModalWithForm>
    );
};

export default RegisterModal;