import React from "react";
import { Link, withRouter } from "react-router-dom";

function Register({ handleRegisterSubmit }) {
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
    handleRegisterSubmit(password, email);
  }

  return (
    <main className="sign__content">
      <div className="sign__container">
        <h2 className="popup__title popup__title_dark">Регистрация</h2>
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
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="sign__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </main>
  );
}
export default withRouter(Register);
