import logoMenu from '../../images/logoMenu.svg';
import logoClose from '../../images/logoClose.svg';
import React, { useState } from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import './navigation.css'
function Navigation({loggedIn, setErrorMessage}) {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenHeader() {
    setIsOpen(true);
  }
  function handleCloseButton() {
    setErrorMessage('')
    setIsOpen(false)
  }
  
  return (
        <div className={`${!isOpen ? 'navigation' : 'navigation_overley'}`}>
            <Switch>
              <Route path={["/movies", "/saved-movies", "/profile","/"]}>
                  { loggedIn ? <img className={`${isOpen ? 'navigation__button' : 'navigation__button_hidden'}`}
                      onClick={handleCloseButton} alt="закрыть меню" src={logoClose}></img> : ''}
                  { loggedIn ? <ul className={`${!isOpen ? 'navigation__container' : 'navigation__container navigation__container_menu'}`}>
                      <li className={`${!isOpen ? 'navigation__listLink' : 'navigation__listLink navigation__listLink_menu'}`}><Link to="/" 
                          className={`${!isOpen ? 'navigation__link_hidden' : 'navigation__link_cursor navigation__link_menu'}`} 
                          onClick={handleCloseButton}>Главная</Link></li>
                      <li className={`${!isOpen ? 'navigation__listLink' : 'navigation__listLink navigation__listLink_menu'}`}><Link to="/movies" 
                          className={`${!isOpen ? 'navigation__link navigation__link_film navigation__link_cursor' : 'navigation__link_cursor navigation__link_menu'}`}
                          onClick={handleCloseButton}>Фильмы</Link></li>
                      <li className={`${!isOpen ? 'navigation__listLink' : 'navigation__listLink navigation__listLink_menu'}`}><Link to="/saved-movies"
                          className={`${!isOpen ? 'navigation__link navigation__link_film navigation__link_cursor' : 'navigation__link_cursor navigation__link_menu'}`}
                          onClick={handleCloseButton}>Сохранённые фильмы</Link></li>
                      <li className={`${!isOpen ? 'navigation__listLink' : 'navigation__listLink navigation__listLink_menu'}`}><Link to="/profile"
                          className={`${!isOpen ? 'navigation__link navigation__link_profile navigation__link_cursor' : 'navigation__link_cursor navigation__link_menu navigation__link_last'}`}
                          onClick={handleCloseButton}>Аккаунт</Link></li>
                  </ul> : ''}
                  { loggedIn ? <img className={`${isOpen ? 'navigation__button_hidden' : 'navigation__logo'}`} alt="бургер" src={logoMenu} onClick={handleOpenHeader}></img>
                  : ''}
                  {!loggedIn ? <Link to="/sign-up" className="navigation__link navigation__link_cursor">Регистрация</Link> : ''}
                  {!loggedIn ? <Link to="/sign-in" className="navigation__link .navigation__link_cursor navigation__link_in">Войти
                      </Link> : ''}
              </Route>
              <Route path="/">
                  {!loggedIn ? <Link to="/sign-in" className="navigation__link .navigation__link_cursor navigation__link_in">Войти
                      </Link> : ''}
                  {!loggedIn ? <Link to="/sign-up" className="navigation__link navigation__link_cursor">Регистрация</Link> : ''}
              </Route>
              <Route path="/sign-in">
                <Link to="/sign-up" className={`${!loggedIn ? 'header__link' : 'header__link_hidden'}`}>Регистрация</Link>
              </Route>
              <Route path="/sign-up">
                <Link to="/sign-in" className={`${!loggedIn ? 'header__link' : 'header__link_hidden'}`}>Войти</Link>
              </Route>
              
            </Switch>
 
        </div>
    );
  }

export default Navigation;


