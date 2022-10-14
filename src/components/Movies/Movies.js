import './movies.css'
import SeachForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import card1 from '../../images/card1.svg';
import card2 from '../../images/card2.svg';
import card3 from '../../images/card3.svg';
import card4 from '../../images/card4.svg';
import card5 from '../../images/card5.svg';
import card6 from '../../images/card6.svg';
import card7 from '../../images/card7.svg';
import card8 from '../../images/card8.svg';
import card9 from '../../images/card9.svg';
import card10 from '../../images/card10.svg';
import card11 from '../../images/card11.svg';
import card12 from '../../images/card12.svg';
import logoMovies from '../../images/logoMovies.svg'
const cards = [];
cards.push(card1,card2,card3,card4,card5,card6,card7,card8,card9,card10,card11,card12);

function Movies() {
  return (
        <div className="movies">
          <SeachForm />
          <MoviesCardList cards={cards} logoButton={logoMovies} />
        </div>
    );
  }

export default Movies;


          