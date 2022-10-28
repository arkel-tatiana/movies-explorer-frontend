import './moviesCard.css';
import React from 'react';
function MoviesCard({movie, logoButton, onSaveMovie, moviesMain, onDeleteMovie}) {
  let isSaved = true
  if (movie.id) {
      isSaved = moviesMain.some(i => i.movieId === movie.id);
  }
  function handleMovie() {
    if (movie.id) {
        moviesMain.some(i => i.movieId === movie.id) ? onDeleteMovie(moviesMain.find(i => i.movieId === movie.id)) : onSaveMovie(movie)
    } else {
      onDeleteMovie(movie)
    }
  }
    return (
        <li className="moviesCard__content">
          <div className="moviesCard__texts">
            <p className="moviesCard__text">{movie.nameRU}</p>
            <p className="moviesCard__text moviesCard__text_min">{`${movie.duration} минут`}</p>
          </div>
          <a className="moviesCard__link" href={movie.trailerLink}
            target="_blank" rel="noreferrer">
            <img className="moviesCard__image" alt="тест картинки" src={!movie.image.url ? movie.image : movie.image.url}/>
          </a>
          <button className="moviesCard__button  " type="button" aria-label="Сохранить фильм" onClick={handleMovie} >
            <p className={`${!isSaved ? 'moviesCard__button_text' : 'moviesCard__button_noactive'}`}>Сохранить</p>
            <img className={`${isSaved ? 'moviesCard__button_active' : 'moviesCard__button_noactive'}`} alt="лого фильм сохранён" src={logoButton}/></button>
        </li>
    );
}

export default MoviesCard;
