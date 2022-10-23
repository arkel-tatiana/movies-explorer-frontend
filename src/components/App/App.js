import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound'
import * as moviesApi from '../../utils/MoviesApi.js';
import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import * as mainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
//import hangleWidth from "../../utils/hangleWidth";
const BASE_URL_image = 'https://api.nomoreparties.co'

const App = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [userData, setUserData] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
//    const [regigedIn, setRegigedIn] = useState(false);
    const [message, setMessage] = useState('')
    const history = useHistory();
    const [errorLogin, setErrorLogin] = useState(false);
 //   const [searchText, setSearchText] = useState('');
    const [moviesMain, setMoviesMain] = useState([]);
    const [showMovies, setShowMovies] = useState([]);
    const [foundMovies, setFoundMovies] = useState([]);
    const [foundMoviesMain, setFoundMoviesMain] = useState([]);
    const [countMovies, setCountMovies] = useState('');
    const [countPushMovies, setCountPushMovies] = useState('');
    const [disambledButton, setDisambledButton] = useState(false);
    let widthScreen = window.screen.width;
    let regPassword = ''
 //   let foundMovies = []
    let moviesYandex = [];
    const desktop = {
        count: 12,
        dopCount: 3,
        width: 1280};
    const tablet = {
        count: 8,
        dopCount: 2,
        width: 768}
    const mobile = {
        count: 5,
        dopCount: 5,
        width: 320}
    let localCheked = false
    localStorage.getItem('checked') === "true" ? localCheked=true : localCheked=false;
    const [checked, setChecked] = useState(localCheked);
        
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setStatusToken(jwt);
        }
    }, [loggedIn]);
    
    useEffect(() => {
        if (loggedIn) {
           history.push('/movies');
        }
    }, [loggedIn])

    useEffect(() => {
        setFoundMoviesMain(moviesMain)
    }, [moviesMain])

       
    useEffect(() => {
        if (foundMovies.length === showMovies.length ||
            foundMovies.length < showMovies.length) {
                setDisambledButton(true)
            } else {
                setDisambledButton(false);
            }
    }, [showMovies.length, foundMovies.length]);
    
    useEffect(() => {
        if (widthScreen <= tablet.width && widthScreen > mobile.width) {
            setCountMovies(tablet.count);
            setCountPushMovies(tablet.dopCount);
        } else if (widthScreen <= mobile.width) {
            setCountMovies(mobile.count);
            setCountPushMovies(mobile.dopCount);
        } else if (widthScreen > tablet.width) {
            setCountMovies(desktop.count);
            setCountPushMovies(desktop.dopCount);
        }
    }, [widthScreen]); 

   

    useEffect(() => {// получили сохраненные фильмы
        if (loggedIn) {
            mainApi.getSaveMovies()
            .then((res) => {
                setMoviesMain(res.filter(i => i.owner.toString() === currentUser._id));
                const localMovies = JSON.parse(localStorage.getItem('movies'))
                setShowMovies(limitMovies(localMovies))
                setFoundMovies(localMovies);
            })
            .catch((err) => {
              console.log(`ошибка ${err}`);
            })
        }
    }, [loggedIn]);
    
    const setStatusToken = (jwt) => {
        mainApi.checkToken(jwt)
        .then((res) => {
            if (res) {
                setLoggedIn(true);
                console.log(12112)
                setCurrentUser(res)
            } else {
                setLoggedIn(false);
            }
        })
        .catch((err)=>{ 
            console.log(`ошибка ${err}`); 
        })
    }
    
    const onRegister = ({ name, email, password }) => {
        regPassword = password
        return mainApi.register(name, email, password)
        .then((res) => {
//         setIsInfoTooltip(true);
            if (res.error) {
                setMessage(res.error);
//              setRegigedIn(false);
                history.push('/sign-up');
            } else {
//              setRegigedIn(true);
                setMessage('');
                onLogin({ email: res.email, password: regPassword})
            //    history.push('/movies');
            }
        })
        .catch((err)=>{ 
            console.log(`ошибка ${err}`); 
        });
    }
      
    const onLogin = ({ email, password }) => {
        return mainApi.authorize(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                    setLoggedIn(true);
                    setErrorLogin(false);
                    history.push('/movies');
                } else {
                setErrorLogin(true);
                };
            })
            .catch((err) => { 
                console.log(`ошибка ${err}`);
            });
    };
    
    const handleUpdateUser = (formData) => {  //запрос на правку данных 
    //    setIsLoading(true);
        mainApi.editUserData(formData)
        .then((res)=>{
          setCurrentUser(res);
        })
        .catch((err)=>{ 
          console.log(`ошибка ${err}`); ; 
        })
        .finally(() => {
//          setIsLoading(false)
        })
      }; 
    const signOut = () => {                  //выход из аккаунта
        localStorage.removeItem('jwt');
        setUserData('')
        setLoggedIn(false);
        history.push('/sign-in');
    }
    const onFoundMovies = (searchText, checked) => {      // поиск фильма
        moviesApi.getMovies()
        .then((res) => {
            moviesYandex = res;
            moviesYandex.forEach(element => {
                element.image.url = BASE_URL_image + element.image.url
                element.image.formats.thumbnail.url = BASE_URL_image + element.image.formats.thumbnail.url
            });
            const filterMovies = moviesYandex.filter(element => 
                (element.nameRU.toLowerCase().includes(searchText.toLowerCase())
                || element.nameEN.toLowerCase().includes(searchText.toLowerCase()))
                & (checked ? element.duration<40 : element.duration>0))
            setFoundMovies (filterMovies)
            setShowMovies(limitMovies(filterMovies))
          //  setShowMovies(foundMovies)
            localStorage.setItem('movies', JSON.stringify(foundMovies));
            localStorage.setItem('checked', checked);
            localStorage.setItem('text', searchText);
        })
        .catch((err) => {
            console.log(`ошибка ${err}`);
        })
    }
    const onSaveFoundMovies = (searchText, checked) => {    // в сохраненных фильмах
        setFoundMoviesMain(moviesMain.filter(element => 
            (element.nameRU.toLowerCase().includes(searchText.toLowerCase())
            || element.nameEN.toLowerCase().includes(searchText.toLowerCase()))
            & (checked ? element.duration<40 : element.duration>0)))
    }
    const onSaveMovie = (dataMovie) => {
        mainApi.savedMovie(dataMovie)
        .then((res) => {
            setMoviesMain([...moviesMain, res])
        //    setFoundMoviesMain([...foundMoviesMain, res])
        })
        .catch((err) => {
            console.log(`ошибка ${err}`);
        })
    }
    const onDeleteMovie = (dataMovie) => {
        mainApi.deleteMovie(dataMovie)
        .then(() => {
            setMoviesMain((state) => state.filter((c) => c._id !== dataMovie._id ))
        })
        .then(() => {
            setFoundMoviesMain((state) => state.filter((c) => c._id !== dataMovie._id ))
        })
        .catch((err) => {
            console.log(`ошибка ${err}`);
        })
    }
    const onChengeCheckbox = (searchText) => {
        setChecked(!checked)
        onFoundMovies (searchText, !checked)
    }
    const onSaveChengeCheckbox = (searchText) => {
        setChecked(!checked)
        onSaveFoundMovies (searchText, !checked)
    }
    const limitMovies = (moviesAll) => {
        console.log(moviesAll)
        console.log(countMovies)
        return moviesAll.slice(0, countMovies)
    }
    const pushMovies = (moviesAll) => {
        console.log(foundMovies)
        console.log(countPushMovies)
        console.log(showMovies.length)
        console.log(moviesAll.slice(showMovies.length, (showMovies.length + countPushMovies)))
        return moviesAll.slice(showMovies.length, (showMovies.length + countPushMovies))
    }
    const onAddFilm = () => {
        console.log(showMovies)
        setShowMovies(showMovies.concat(...pushMovies(foundMovies)));
    }

  return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
                <Switch>
                    <Route path="/sign-up">
                        <Register onRegister={onRegister}/>
                    </Route>
                    <Route path="/sign-in">
                        <Login onLogin={onLogin} errorLogin={errorLogin} error={'Введен некорректный email или пароль'}/>
                    </Route>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <ProtectedRoute
                        path="/movies"
                        loggedIn={loggedIn}
                        onFoundMovies={onFoundMovies}
                        showMovies={showMovies}
                        onSaveMovie={onSaveMovie}
                        moviesMain={moviesMain}
                        onChengeCheckbox={onChengeCheckbox}
                        checked={checked}
                        onAddFilm={onAddFilm}
                        foundMovies={foundMovies}
                        disambledButton={disambledButton}
                        component={Movies} />
                    <ProtectedRoute
                        path="/saved-movies"
                        loggedIn={loggedIn}
                        onSaveFoundMovies={onSaveFoundMovies}
                        foundMoviesMain={foundMoviesMain}
                        onDeleteMovie={onDeleteMovie}
                        moviesMain={moviesMain}
                        onSaveChengeCheckbox={onSaveChengeCheckbox}
                        checked={checked}
                        component={SavedMovies} />
                    <ProtectedRoute
                        path="/profile"
                        loggedIn={loggedIn}
                        onUpdateUser={handleUpdateUser}
                        onSignOut={signOut}
                        component={Profile} />    
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
