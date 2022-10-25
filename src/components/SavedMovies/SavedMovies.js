import './savedMovies.css'
import SeachForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import logoDeleteMovie from '../../images/logoDeleteMovie.svg';



function SavedMovies({loggedIn, onSaveFoundMovies, foundMoviesMain, onDeleteMovie, moviesMain, onSaveChengeCheckbox, checked}) {
    return (
        <div className="savedMovies">
            <SeachForm onFoundMovies={onSaveFoundMovies} onChengeCheckbox={onSaveChengeCheckbox} checked={checked} />
            <MoviesCardList showMovies={foundMoviesMain} logoButton={logoDeleteMovie}
                onHandleMovie={onDeleteMovie} moviesMain={moviesMain}/>
        </div>
    );
}

export default SavedMovies;
