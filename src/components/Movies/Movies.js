import './movies.css'
import React from 'react'
import SeachForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import logoMovies from '../../images/logoMovies.svg'

function Movies({
    state,
    loggedIn,
    onFoundMovies,
    showMovies,
    onSaveMovie,
    moviesMain,
    onChengeCheckbox,
    checked,
    onAddFilm,
    foundMovies,
    disambledButton,
    errorMessage,
    onDeleteMovie,
    isLoading
})
  {
      return (
        <div className="movies">
          <SeachForm
              onFoundMovies={onFoundMovies}
              onChengeCheckbox={onChengeCheckbox}
              checked={checked}
              isLoading={isLoading}
              isSaved={false} />
          <MoviesCardList
              showMovies={showMovies}
              logoButton={logoMovies}
              onSaveMovie={onSaveMovie}
              moviesMain={moviesMain}
              onAddFilm={onAddFilm}
              foundMovies={foundMovies}
              disambledButton={disambledButton}
              onDeleteMovie={onDeleteMovie} 
              isLoading={isLoading} />
          <span className={`${errorMessage ? 'movies__error' : 'movies__error_visible'}`} >{errorMessage}</span>
        </div>
    );
  }

export default Movies;
