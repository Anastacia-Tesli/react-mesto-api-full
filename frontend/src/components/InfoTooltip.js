function InfoTooltip(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      onClick={props.onOverlay}
    >
      <div className="popup__container popup_type_info">
        <button
          className="button popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img className="popup__icon" src={props.image} />
        <h2 className="popup__title">{props.text}</h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
