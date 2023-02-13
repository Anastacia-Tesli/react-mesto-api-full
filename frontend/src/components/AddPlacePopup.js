import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function AddPlacePopup({ isOpen, isLoading, onClose, onOverlay, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      button={isLoading ? "Загрузка..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        className="popup__input"
        name="name"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__error place-input-error"></span>
      <input
        id="link-input"
        className="popup__input"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
