import { useEffect, useState, useContext } from "react";
import ModalWithForm from "../App/ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, handleCloseClick, onEditProfile }) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEditProfile({ name, avatar });
    };

    useEffect(() => {
        if (isOpen && currentUser) {
            setName(currentUser.name || "");
            setAvatar(currentUser.avatar || "");
        }
    }, [isOpen, currentUser]);

    return (
        <ModalWithForm
        title="Edit Profile"
        buttonText="Save"
        isOpen={isOpen}
        handleCloseClick={handleCloseClick}
        onSubmit={handleSubmit}
        >
            <label htmlFor="name" className="modal__label">
                Name{""}
                <input
                  type="text"
                  className="modal__input"
                  id="name-edit"
                  placeholder="Name"
                  required
                  name="name"
                  minLength="1"
                  maxLength="30"
                  onChange={handleNameChange}
                  value={name}
                />  
            </label>
            <label htmlFor="avatarUrl" className="modal__label">
                Avatar URL{""}
                <input
                  type="url"
                  className="modal__input"
                  id="avatarUrl"
                  placeholder="Avatar URL"
                  required
                  name="avatar"
                  onChange={handleAvatarChange}
                  value={avatar}
                />  
            </label>
        </ModalWithForm>
    );
};

export default EditProfileModal;