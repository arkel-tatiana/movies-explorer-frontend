import './moviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { Route, Switch} from 'react-router-dom';

function MoviesCardList({showMovies, logoButton, onSaveMovie, moviesMain, onAddFilm, foundMovies, disambledButton, onDeleteMovie, isLoading }) {
    function hangleAddFilm(){
        onAddFilm(foundMovies)
    }
    return (
        <section className='moviesCardList'>
          <ul className="moviesCardList__container">
              {showMovies.map((item, i) => (
                <MoviesCard
                    movie={item}
                    logoButton={logoButton}
                    onSaveMovie={onSaveMovie}
                    moviesMain={moviesMain}
                    onDeleteMovie={onDeleteMovie}
                    isLoading={isLoading}
                    key={i}/>
              ))}
          </ul>
          <Switch>
            <Route path="/movies">
                <button
                    className={`${!disambledButton && showMovies.length > 3? 'moviesCardList__button_dop' : 'moviesCardList__button_visible'}`}
                    type="button" aria-label="Добавить фильмы" 
                    onClick={hangleAddFilm}
                    disabled={disambledButton}>Ещё</button>
            </Route>  
          </Switch>
        </section>
  );
}

export default MoviesCardList;


