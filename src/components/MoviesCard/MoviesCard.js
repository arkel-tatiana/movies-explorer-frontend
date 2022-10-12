import './moviesCard.css';
const nameRU = "фильм"
const duration = 20

function MoviesCard({card, logoButton}) {
  return (
        <li className="moviesCard__content">
          <div className="moviesCard__texts">
            <p className="moviesCard__text">{nameRU}</p>
            <p className="moviesCard__text moviesCard__text_min">{`${duration} минут`}</p>
          </div>
          <img className="moviesCard__image" alt="тест картинки" src={card}/>
          <button className="moviesCard__button  " type="button" aria-label="Сохранить фильм" >
            <p className="moviesCard__button_text">Сохранить</p>
            <img className="moviesCard__button_active" alt="лого фильм сохранён" src={logoButton}/></button>
        </li>
    );
  }

export default MoviesCard;