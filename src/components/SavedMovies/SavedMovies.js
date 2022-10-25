import './savedMovies.css'
import SeachForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import logoDeleteMovie from '../../images/logoDeleteMovie.svg';



function SavedMovies({loggedIn, onSaveFoundMovies, foundMoviesMain, onDeleteMovie, moviesMain, onSaveChengeCheckbox, checked, errorMessage}) {
    return (
        <div className="savedMovies">
            <SeachForm onFoundMovies={onSaveFoundMovies} onChengeCheckbox={onSaveChengeCheckbox} checked={checked} />
            <MoviesCardList showMovies={foundMoviesMain} logoButton={logoDeleteMovie}
                onHandleMovie={onDeleteMovie} moviesMain={moviesMain}/>
            <span className={`${errorMessage ? 'savedMovies__error' : 'savedMovies__error_visible'}`} >{errorMessage}</span>
        </div>
    );
}

export default SavedMovies;
