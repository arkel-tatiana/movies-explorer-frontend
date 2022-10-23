import './savedMovies.css'
import SeachForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import card1 from '../../images/card1.svg';
import card2 from '../../images/card2.svg';
import card3 from '../../images/card3.svg';
import logoDeleteMovie from '../../images/logoDeleteMovie.svg';



function SavedMovies({loggedIn, onSaveFoundMovies, foundMoviesMain, onDeleteMovie, moviesMain, onSaveChengeCheckbox, checked}) {
  console.log(onSaveFoundMovies)
    return (
        <div className="savedMovies">
            <SeachForm onFoundMovies={onSaveFoundMovies} onChengeCheckbox={onSaveChengeCheckbox} checked={checked} />
            <MoviesCardList showMovies={foundMoviesMain} logoButton={logoDeleteMovie}
                onHandleMovie={onDeleteMovie} moviesMain={moviesMain}/>
        </div>
    );
}

export default SavedMovies;
