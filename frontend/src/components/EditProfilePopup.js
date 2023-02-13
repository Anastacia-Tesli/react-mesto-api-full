import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import React from "react";

function EditProfilePopup({
  isOpen,
  isLoading,
  onClose,
  onOverlay,
  onUpdateUser,
}) {
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  const user = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(user ? user.name : "");
    setAbout(user ? user.about : "");
  }, [user, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name: name, about: about });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      button={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        className="popup__input"
        name="name"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error name-input-error"></span>
      <input
        id="job-input"
        className="popup__input"
        name="about"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={about || ""}
        onChange={handleAboutChange}
      />
      <span className="popup__error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
