import './moviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React, { useState, useEffect } from 'react'
import { Route, Switch} from 'react-router-dom';

function MoviesCardList({cards, logoButton}) {
    
  let kolCards = 12;
  let dopCards =3;
  if (window.screen.width <= 768 && window.screen.width > 320) {
    kolCards = 8;
    dopCards = 2;
  } else if (window.screen.width <= 320) {
    kolCards = 5;
    dopCards = 5;
  } 
  
  let start = kolCards
  let newCards=cards.slice(0, kolCards)
  
  function hangleAddFilm(){
    let stop=0
    start+dopCards < cards.length ? stop=start+dopCards : stop=cards.length
    newCards.push(...cards.slice(start, stop));
    start=start+dopCards
  }
  return (
        <section className="moviesCardList">
          <ul className="moviesCardList__container">
            {newCards.map((item, i) => (
          <MoviesCard card={item} logoButton={logoButton} key={i}/>
      ))}
    </ul>
    <Switch>
        <Route path="/movies">
          <button className="moviesCardList__button_dop" type="button" aria-label="Добавить фильмы" onClick={hangleAddFilm} >Ещё</button>
        </Route>  
    </Switch>
  </section>
  );
}

export default MoviesCardList;
