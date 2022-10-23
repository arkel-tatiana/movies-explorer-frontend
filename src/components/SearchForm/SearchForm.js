import './searchForm.css'
import logoFind from '../../images/logoFind.svg';
import React, { useState } from 'react'
function SeachForm({onFoundMovies, onChengeCheckbox, checked}) {
  const [searchText, setSearchText] = useState(localStorage.getItem('text'));
  const [searchError, setSearchError] = useState(false);
 // const [checked, setChecked] = useState(false);
  

function handleSubmitFound(e) {
      e.preventDefault();
      if (searchText.length === 0) {
          setSearchError(true)
      } else {
          setSearchError(false)
          onFoundMovies(searchText, checked)
      }
  } 
  function chengeCheckbox() {
      onChengeCheckbox(searchText)
  }
  return (
        <div className="seachForm">
            <form className="seachForm__content" onSubmit={handleSubmitFound} noValidate>
                <input className="seachForm__input"
                    id="found-film"
                    name="foundFilm"
                    type="text"
                    onChange={event => setSearchText(event.target.value)}
                    placeholder="Фильм"
                    required
                    //value={values.email || ''}
                    value={searchText}
                    >
                </input>
                <span className={`${searchError ? 'seachForm__error' : 'seachForm__error_visible'}`}>Нужно ввести ключевое слово</span>
                <button className="seachForm__button" type="submit" aria-label="Поиск фильма" >
                    <img className="seachForm__logo" alt="Логотип поиска" src={logoFind}/>
                </button>
            </form>
          <div className="seachForm__checkbox-container">
            <input type="checkbox" className="seachForm__checkbox"
                id="seachForm__checkbox" name="seachForm__checkbox" 
                checked={checked} onChange={chengeCheckbox}/>
            <label htmlFor="seachForm__checkbox" className="seachForm__label"></label>
            <p className="seachForm__checkbox-text">Короткометражки</p>
          </div>
        </div>
    );
  }

export default SeachForm;
