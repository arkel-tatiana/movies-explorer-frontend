import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound'
import {api} from '../../utils/Api.js';
import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import * as auth from '../../utils/auth.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css'

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
                <Switch>
                    <Route path="/sign-up">
                        <Register />
                    </Route>
                    <Route path="/sign-in">
                        <Login />
                    </Route>
                    <Route path="/movies">
                        <Movies/>
                    </Route>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <Route path="/saved-movies">
                        <SavedMovies/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>  
                    <Route path="*">
                        <PageNotFound/>
                    </Route> 
                </Switch>
                
                <Footer />
        </CurrentUserContext.Provider> 
    </div>
  );
}

export default App;
