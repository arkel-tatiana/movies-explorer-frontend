import './savedMovies.css'
import SeachForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import card1 from '../../images/card1.svg';
import card2 from '../../images/card2.svg';
import card3 from '../../images/card3.svg';
import logoDeleteMovie from '../../images/logoDeleteMovie.svg';
const cards = [];
cards.push(card1,card2,card3);

function SavedMovies() {
  return (
        <div className="savedMovies">
            <SeachForm />
            <MoviesCardList cards={cards} logoButton={logoDeleteMovie} />
        </div>
    );
  }

export default SavedMovies;
