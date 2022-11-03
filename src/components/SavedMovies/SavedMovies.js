import './savedMovies.css'
import SeachForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import logoDeleteMovie from '../../images/logoDeleteMovie.svg';



function SavedMovies({
    state,
    loggedIn,
    onSaveFoundMovies,
    foundMoviesMain,
    onDeleteMovie,
    moviesMain,
    onSaveChengeCheckbox,
    checkedSave,
    errorMessage,
    isLoading}) {
    console.log(checkedSave)
    return (
        <div className="savedMovies">
            <SeachForm onFoundMovies={onSaveFoundMovies} onChengeCheckbox={onSaveChengeCheckbox} checked={checkedSave} isLoading={isLoading} isSaved={true}/>
            <MoviesCardList showMovies={foundMoviesMain} logoButton={logoDeleteMovie}
                onDeleteMovie={onDeleteMovie} moviesMain={moviesMain} isLoading={isLoading}/>
            <span className={`${errorMessage ? 'savedMovies__error' : 'savedMovies__error_visible'}`} >{errorMessage}</span>
        </div>
    );
}

export default SavedMovies;
