import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound'
import Preloader from '../Preloader/Preloader';
import * as moviesApi from '../../utils/MoviesApi.js';
import React, { useState, useEffect } from 'react'
import { Route, Switch,  useHistory } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import * as mainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as windowWidth from '../../utils/WindowWidth.js'
import './App.css'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Error from '../Error/Error';
import * as constant from '../../utils/Constant'

const App = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const history = useHistory();
    const [errorLogin, setErrorLogin] = useState(false);
    const [moviesMain, setMoviesMain] = useState([]);
    const [showMovies, setShowMovies] = useState([]);
    const [foundMovies, setFoundMovies] = useState([]);
    const [foundMoviesMain, setFoundMoviesMain] = useState([]);
    const [countMovies, setCountMovies] = useState('');
    const [countPushMovies, setCountPushMovies] = useState('');
    const [disambledButton, setDisambledButton] = useState(false);
    const [errorRegister, setErrorRegister] = useState(false);
    const [errorTopPozishion, setErrorTopPozishion] = useState('');
    
    let widthScreen = windowWidth.useCurrentWidth();
    let regPassword = '';
    let moviesYandex = [];
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
        setFoundMoviesMain(moviesMain);
    }, [moviesMain])

       
    useEffect(() => {
        if (foundMovies.length === showMovies.length ||
            foundMovies.length < showMovies.length) {
                setDisambledButton(true);
            } else {
                setDisambledButton(false);
            }
    }, [showMovies.length, foundMovies.length]);
    
    useEffect(() => {
        if (widthScreen <= constant.tablet.width && widthScreen > constant.mobile.width) {
            setCountMovies(constant.tablet.count);
            setCountPushMovies(constant.tablet.dopCount);
        } else if (widthScreen <= constant.mobile.width) {
            setCountMovies(constant.mobile.count);
            setCountPushMovies(constant.mobile.dopCount);
        } else if (widthScreen > constant.tablet.width) {
            setCountMovies(constant.desktop.count);
            setCountPushMovies(constant.desktop.dopCount);
        }
    }, [widthScreen]); 

   

    useEffect(() => {// получили сохраненные фильмы
        if (loggedIn) {
            setIsLoading(true);
            setErrorMessage('')
            mainApi.getSaveMovies()
            .then((res) => {
                setMoviesMain(res.filter(i => i.owner.toString() === currentUser._id));
                const localMovies = JSON.parse(localStorage.getItem('movies'));
                if (localMovies) {
                    setShowMovies(limitMovies(localMovies));
                    setFoundMovies(localMovies);
                };
            })
            .catch((err) => {
                setErrorTopPozishion(290);
                setErrorMessage(constant.errorServer);
                console.log(`ошибка ${err}`);
            })
            .finally(() => {
                setIsLoading(false)
            })
        }
    }, [loggedIn]);
    
    

    const setStatusToken = (jwt) => {
        mainApi.checkToken(jwt)
        .then((res) => {
            setErrorMessage('')
            if (res) {
                setLoggedIn(true);
                setCurrentUser(res)
            } else {
                setLoggedIn(false);
            }
        })
        .catch((err)=>{ 
            setErrorTopPozishion(290)
            setErrorMessage(constant.errorServer)
            console.log(`ошибка ${err}`); 
        })
    }
    
    const onRegister = ({ name, email, password }) => {
        regPassword = password;
        setIsLoading(true);
        setErrorTopPozishion(450);
        return mainApi.register(name, email, password)
        .then((res) => {
            if (res.message) {
                setErrorMessage(constant.errorUnique);
                history.push('/sign-up');
            } else {
                setErrorMessage('');
                onLogin({ email: res.email, password: regPassword});
            }
        })
        .catch((err)=>{
            setErrorMessage(constant.errorServer);
            setErrorRegister(true);
            console.log(`ошибка ${err}`); 
        })
        .finally(() => {
            setIsLoading(false)
        })
    }
      
    const onLogin = ({ email, password }) => {
        setIsLoading(true)
        setErrorTopPozishion(400)
        return mainApi.authorize(email, password)
            .then((res) => {
                setErrorMessage('')
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                    setLoggedIn(true);
                    history.push('/movies');
                } else {
                    setErrorMessage(constant.errorAuth)
                }
            })
            .catch((err) => { 
                setErrorMessage(constant.errorServer);
                console.log(`ошибка ${err}`);
            })
            .finally(() => {
                setIsLoading(false)
            });
    };
    
    const handleUpdateUser = (formData) => {  //запрос на правку данных 
        setIsLoading(true);
        setErrorTopPozishion(450)
        mainApi.editUserData(formData)
        .then((res)=>{
            setCurrentUser(res);
        })
        .catch((err)=>{ 
            err === 'Ошибка: 409' ? setErrorMessage(constant.errorUnique) : setErrorMessage(constant.errorServer);
            console.log(`ошибка ${err}`); ; 
        })
        .finally(() => {
            setIsLoading(false)
        })
      }; 
    const signOut = () => {                  //выход из аккаунта
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('checked');
        localStorage.removeItem('text');
        setLoggedIn(false);
        history.push('/sign-in');
    }
    const searchTextMovie = (searchText, checked) => {
        const filterMovies = moviesYandex.filter(element => 
            (element.nameRU.toLowerCase().includes(searchText.toLowerCase())
            || element.nameEN.toLowerCase().includes(searchText.toLowerCase()))
            & (checked ? element.duration<40 : element.duration>0))
        setFoundMovies (filterMovies);
        setShowMovies(limitMovies(filterMovies))
        localStorage.setItem('movies', JSON.stringify(filterMovies));
        localStorage.setItem('checked', checked);
        localStorage.setItem('text', searchText);
        setErrorTopPozishion(160);
        filterMovies.length === 0 ? setErrorMessage(constant.errorFound) : setErrorMessage('');
    } 
    const onFoundMovies = (searchText, checked) => {              // поиск фильма
        if (moviesYandex.length === 0) {
            setIsLoading(true); 
            moviesApi.getMovies()
            .then((res) => {
                setErrorMessage('')
                moviesYandex = res;
                moviesYandex.forEach(element => {
                element.image.url = constant.BASE_URL_image + element.image.url
                element.image.formats.thumbnail.url = constant.BASE_URL_image + element.image.formats.thumbnail.url
            });
                searchTextMovie(searchText, checked)
            })
            .catch((err) => {
                setErrorTopPozishion(160)
                setErrorMessage(constant.errorServer)
                console.log(`ошибка ${err}`);
            })
            .finally(() => {
                setIsLoading(false)
            })
        } else {
            searchTextMovie(searchText, checked)
        }
    }
    const onSaveFoundMovies = (searchText, checked) => {    // в сохраненных фильмах
        setErrorTopPozishion(160)
        const filterMoviesMain = moviesMain.filter(element => 
            (element.nameRU.toLowerCase().includes(searchText.toLowerCase())
            || element.nameEN.toLowerCase().includes(searchText.toLowerCase()))
            & (checked ? element.duration<40 : element.duration>0));
        setFoundMoviesMain(filterMoviesMain);
        filterMoviesMain.length === 0 ? setErrorMessage(constant.errorFound) : setErrorMessage('');
    }
    const onSaveMovie = (dataMovie) => {
        setIsLoading(true)
        mainApi.savedMovie(dataMovie)
        .then((res) => {
            setMoviesMain([...moviesMain, res]);
        })
        .catch((err) => {
            err === "Ошибка: 400" ? setErrorMessage(constant.errorValidMovies) : setErrorMessage(constant.errorServer);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
    const onDeleteMovie = (dataMovie) => {
        setIsLoading(true);
        mainApi.deleteMovie(dataMovie)
        .then(() => {
            setMoviesMain((state) => state.filter((c) => c._id !== dataMovie._id ));
        })
        .then(() => {
            setFoundMoviesMain((state) => state.filter((c) => c._id !== dataMovie._id ));
        })
        .catch((err) => {
            setErrorTopPozishion(160);
            setErrorMessage(constant.errorServer);
            console.log(`ошибка ${err}`);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
    const onChengeCheckbox = (searchText) => {
        setChecked(!checked);
        onFoundMovies (searchText, !checked);
    }
    const onSaveChengeCheckbox = (searchText) => {
        setChecked(!checked);
        onSaveFoundMovies (searchText, !checked);
    }
    const limitMovies = (moviesAll) => {
        return moviesAll.slice(0, countMovies);
    }
    const pushMovies = (moviesAll) => {
        return moviesAll.slice(showMovies.length, (showMovies.length + countPushMovies));
    }
    const onAddFilm = () => {
        setShowMovies(showMovies.concat(...pushMovies(foundMovies)));
    }

  return (
    <div className="page">
        {isLoading ? <Preloader /> : ''}
        {errorMessage.length !== 0 ? <Error errorMessage={errorMessage} errorTopPozishion={errorTopPozishion}/> : ''}
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
                <Switch>
                    <Route path="/sign-up">
                        <Register onRegister={onRegister} errorRegister={errorRegister}/>
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
