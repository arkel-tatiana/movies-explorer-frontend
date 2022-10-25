import './movies.css'
import React from 'react'
import SeachForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import logoMovies from '../../images/logoMovies.svg'

function Movies({onFoundMovies, showMovies, onSaveMovie, moviesMain, onChengeCheckbox, checked, onAddFilm, foundMovies, disambledButton, errorMessage}) {
  
  return (
        <div className="movies">
          <SeachForm
              onFoundMovies={onFoundMovies}
              onChengeCheckbox={onChengeCheckbox}
              checked={checked}/>
          <MoviesCardList
              showMovies={showMovies}
              logoButton={logoMovies}
              onHandleMovie={onSaveMovie}
              moviesMain={moviesMain}
              onAddFilm={onAddFilm}
              foundMovies={foundMovies}
              disambledButton={disambledButton}/>
          <span className={`${errorMessage ? 'movies__error' : 'movies__error_visible'}`} >{errorMessage}</span>
        </div>
    );
  }

export default Movies;
