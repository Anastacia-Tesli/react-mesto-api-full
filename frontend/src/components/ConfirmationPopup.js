import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function ConfirmationPopup({
  card,
  isLoading,
  isOpen,
  onClose,
  onOverlay,
  DeleteCard,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    DeleteCard(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      button={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmationPopup;
