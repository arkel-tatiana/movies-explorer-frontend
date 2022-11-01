import './searchForm.css'
import logoFind from '../../images/logoFind.svg';
import { useForm } from 'react-hook-form';
import React from 'react'
function SeachForm({onFoundMovies, onChengeCheckbox, checked, isLoading, isSaved }) {
    console.log(checked)
    let searchTextLocal = ""
    if (isSaved) {
        localStorage.getItem('textSave') ? searchTextLocal = localStorage.getItem('textSave') : searchTextLocal = "";
    } else {    
        localStorage.getItem('text') ? searchTextLocal = localStorage.getItem('text') : searchTextLocal = "";
    }
    
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({mode: "onSubmit", defaultValues: { searchText: searchTextLocal }});
   
    const onSubmit = (data) => {
        onFoundMovies(data.searchText, checked);
    }

    function chengeCheckbox() {
        onChengeCheckbox(searchTextLocal);
    }
  return (
        <div className="seachForm">
            <form className="seachForm__content" onSubmit={handleSubmit(onSubmit)} >
                <input className="seachForm__input"
                    {...register("searchText", {
                       required: "Нужно ввести ключевое слово"
                    })}
                disabled={isLoading}
                type="text"
                placeholder="Фильм"
                >
                </input>
                {errors?.searchText && <span className="seachForm__error">{errors.searchText.message}</span>}
                <button className="seachForm__button" type="submit" aria-label="Поиск фильма" disabled={isLoading}>
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
