import './searchForm.css'
import logoFind from '../../images/logoFind.svg';
function SeachForm() {
  return (
        <div className="seachForm">
            <div className="seachForm__content">
                <input className="seachForm__input"
                    id="found-film"
                    name="foundFilm"
                    type="text"
                    placeholder="Фильм">
                </input>
                <button className="seachForm__button" type="button" aria-label="Поиск фильма" >
                    <img className="seachForm__logo" alt="Логотип поиска" src={logoFind}/>
                </button>
            </div>
          <div className="seachForm__checkbox-container">
            <input type="checkbox" className="seachForm__checkbox" id="seachForm__checkbox" name="seachForm__checkbox" />
            <label htmlFor="seachForm__checkbox" className="seachForm__label"></label>
            <p className="seachForm__checkbox-text">Короткометражки</p>
          </div>
        </div>
    );
  }

export default SeachForm;
