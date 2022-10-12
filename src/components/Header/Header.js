import headerLogo from '../../images/logoColorMain.svg';
import React, { useState } from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import './header.css'
import Navigation from '../Navigation/Navigation'
function Header() {
  return (
            <Switch>
              <Route path={["/movies", "/saved-movies", "/profile"]}>
                <header className="header">
                  <Link className="header__logo" style={{ backgroundImage: `url(${headerLogo})` }} to="/"></Link>
                  <Navigation />
                </header>
              </Route>
              <Route exact path="/">
                <header className="header header_color">
                  <Link className="header__logo" style={{ backgroundImage: `url(${headerLogo})` }} to="/"></Link>
                  <Navigation />
                </header>
              </Route>
              <Route path={["/sign-in", "/sign-up"]}>
                <header className="header header_forma">
                  <Link className="header__logo header__logo_forma" style={{ backgroundImage: `url(${headerLogo})` }} to="/"></Link>
                </header>
              </Route>
            </Switch>
    );
  }

export default Header;


