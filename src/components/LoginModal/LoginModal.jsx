import { useEffect, useState } from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ isOpen, handleCloseClick, onLogin, handleRegisterClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    };

    useEffect(() => {
        if (isOpen) {
          setEmail("");
          setPassword("");
        }
    }, [isOpen]);

    return (
        <ModalWithForm
          title="Log In"
          buttonText="Login"
          isOpen={isOpen}
          handleCloseClick={handleCloseClick}
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="modal__label">
            Email{""}
            <input
              type="email"
              className="modal__input"
              id="email-login"
              placeholder="Email"
              required
              name="email"
              onChange={handleEmailChange}
              value={email}
            />
          </label>
          <label htmlFor="password" className="modal__label">
            Password{""}
            <input
              type="password"
              className="modal__input"
              id="password-login"
              placeholder="Password"
              required
              name="password"
              minLength="1"
              maxLength="20"
              onChange={handlePasswordChange}
              value={password}
            />
          </label>
          <div className="modal__button-container">
              <button 
               type="button"
               className="modal__register"
               onClick={handleRegisterClick}
              >
                Or SignUp
              </button>
          </div>
        </ModalWithForm>
    );
};

export default LoginModal;