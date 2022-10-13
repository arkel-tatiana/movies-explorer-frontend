import './searchForm.css'
import logoFind from '../../images/logoFind.svg';
import React from 'react';
function SeachForm() {
  const [searchText, setSearchText] = React.useState('');
  const [searchError, setSearchError] = React.useState(false);
  function handleSubmitFound(e) {
      e.preventDefault();
      if (searchText.length === 0) {
          setSearchError(true)
      } else {
          setSearchError(false)
      
      }
  } 
  return (
        <div className="seachForm">
            <form className="seachForm__content" onSubmit={handleSubmitFound} noValidate>
                <input className="seachForm__input"
                    id="found-film"
                    name="foundFilm"
                    type="text"
                    onChange={event => setSearchText(event.target.value)}
                    required
                    placeholder="Фильм">
                </input>
                <span className={`${searchError ? 'seachForm__error' : 'seachForm__error_visible'}`}>Нужно ввести ключевое слово</span>
                <button className="seachForm__button" type="submit" aria-label="Поиск фильма" >
                    <img className="seachForm__logo" alt="Логотип поиска" src={logoFind}/>
                </button>
            </form>
          <div className="seachForm__checkbox-container">
            <input type="checkbox" className="seachForm__checkbox" id="seachForm__checkbox" name="seachForm__checkbox" />
            <label htmlFor="seachForm__checkbox" className="seachForm__label"></label>
            <p className="seachForm__checkbox-text">Короткометражки</p>
          </div>
        </div>
    );
  }

export default SeachForm;
