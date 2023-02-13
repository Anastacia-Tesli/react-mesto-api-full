import logo from "../images/Vector.svg";
import { Link, Route, Switch, useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    props.setLoggedIn(false);
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип приложения Место" />
      <div className="header__group">
        <Switch>
          <Route exact path="/">
            <p className="header__link">{props.email}</p>
            <Link className="header__link" to="/sign-in" onClick={signOut}>
              Выйти
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
