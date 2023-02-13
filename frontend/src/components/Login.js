import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { withRouter } from "react-router-dom";
import React from "react";

function Login({ handleLoginSubmit }) {
  const user = React.useContext(CurrentUserContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLoginSubmit(password, email);
  }
  return (
    <main className="sign__content">
      <div className="sign__container">
        <h2 className="popup__title popup__title_dark">Вход</h2>
        <form className="sign__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            className="sign__input"
            type="email"
            required
            minLength="2"
            placeholder="Email"
            value={email || ""}
            onChange={handleEmailChange}
          ></input>
          <input
            id="password"
            name="password"
            className="sign__input"
            type="password"
            required
            minLength="6"
            placeholder="Пароль"
            value={password || ""}
            onChange={handlePasswordChange}
          ></input>
          <button className="sign__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}
export default withRouter(Login);
