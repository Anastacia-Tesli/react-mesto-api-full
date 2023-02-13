import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditAvatarPopup({
  isOpen,
  isLoading,
  onClose,
  onOverlay,
  onUpdateAvatar,
}) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="pic"
      title="Обновить аватар"
      button={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="pic-input"
        className="popup__input"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        minLength="2"
        required
      />
      <span className="popup__error pic-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
