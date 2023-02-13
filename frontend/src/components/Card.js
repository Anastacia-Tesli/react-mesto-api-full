import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const user = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  const isOwner = card.owner._id === user._id;
  const deleteButtonClassName = `${
    isOwner ? "button place__delete-button" : "place__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((like) => like._id === user._id);
  const likeButtonClassName = `place__like-button ${
    isLiked ? "button_active" : ""
  }`;

  return (
    <article className="place">
      <img
        className="place__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <button
        className={deleteButtonClassName}
        type="button"
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      ></button>
      <div className="place__caption">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like">
          <button
            className={likeButtonClassName}
            type="button"
            aria-label="Лайкнуть"
            onClick={handleLikeClick}
          ></button>
          <span className="place__like-number" aria-label="Количество лайков">
            {card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}
export default Card;
