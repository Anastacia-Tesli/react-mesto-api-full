function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onOverlay}
    >
      <div className="popup__container">
        <button
          className="button popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={`${props.name}-form`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__button" type="submit">
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
