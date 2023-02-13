function ImagePopup({ card, onClose, onOverlay }) {
  return (
    <div
      className={`popup popup_type_show ${card ? "popup_opened" : ""}`}
      onClick={onOverlay}
    >
      <div className="popup__content">
        <button
          className="button popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h2 className="popup__description">{card?.name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;
