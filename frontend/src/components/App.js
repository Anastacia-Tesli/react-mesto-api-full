import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import {
  withRouter,
  Redirect,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import { api } from "../utils/api.js";
import Register from "./Register.js";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import InfoTooltip from "./InfoTooltip";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ImagePopup from "./ImagePopup.js";
import * as auth from "../utils/Auth.js";
import confirm from "../images/Union.png";
import regect from "../images/Union2.png";
import React from "react";

function App() {
  // Стейты

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] =
    React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState("");
  const [text, setText] = React.useState("");

  // Открытие и закрытие попапов

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setIsConfirmationPopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function closeOnOverlayClick(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  // Карточки

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    if (!isLiked) {
      api
        .putLike(card._id)
        .then((like) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? like : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((like) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? like : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item !== card;
          })
        );
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Пользователь

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data)
      .then((info) => {
        setCurrentUser(info);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data)
      .then((info) => {
        setCurrentUser(info);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            console.log(email);
            console.log(res.data.email);
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(email);
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((info) => {
          setCurrentUser(info);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  const history = useHistory();
  function handleRegisterSubmit(password, email) {
    console.log(password, email);
    auth
      .register(password, email)
      .then(() => {
        setImage(confirm);
        setText("Вы успешно зарегистрировались!");
      })
      .then(() => {
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setImage(regect);
        setText("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }
  function handleLoginSubmit(password, email) {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setEmail(email);
        setLoggedIn(true);
        history.push("/");
        return data;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltipPopupOpen(true);
        setImage(regect);
        setText("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header setLoggedIn={setLoggedIn} email={email} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onCardLike={handleCardLike}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardDelete={handleDeleteClick}
            />
            <Route path="/sign-up">
              <Register handleRegisterSubmit={handleRegisterSubmit} />
            </Route>
            <Route path="/sign-in">
              <Login handleLoginSubmit={handleLoginSubmit} />
            </Route>
          </Switch>
          <InfoTooltip
            image={image}
            text={text}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            onOverlay={closeOnOverlayClick}
          />
          <EditProfilePopup
            isLoading={isLoading}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onOverlay={closeOnOverlayClick}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isLoading={isLoading}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onOverlay={closeOnOverlayClick}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isLoading={isLoading}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onOverlay={closeOnOverlayClick}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ConfirmationPopup
            isLoading={isLoading}
            card={deletedCard}
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onOverlay={closeOnOverlayClick}
            DeleteCard={handleCardDelete}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onOverlay={closeOnOverlayClick}
          />
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default withRouter(App);
