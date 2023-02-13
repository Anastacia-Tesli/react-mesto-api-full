import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";
import React from "react";
function Main({
  cards,
  onCardLike,
  onCardClick,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardDelete,
}) {
  const user = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__pic" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            alt="Аватар пользователя"
            src={user.avatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__heading">
            <h1 className="profile__name">{user.name}</h1>
            <button
              className="button button_open profile__edit-button"
              onClick={onEditProfile}
              type="button"
              aria-label="Открыть редактирование профиля"
            ></button>
          </div>
          <p className="profile__job">{user.about}</p>
        </div>
        <button
          className="button button_open profile__add-button"
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить место"
        ></button>
      </section>
      <section className="places">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          ></Card>
        ))}
      </section>
    </main>
  );
}
export default Main;
