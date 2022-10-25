import './profile.css'
import useForm from "../../utils/UseForm";
import validate from '../../utils/LoginFormValidationRules';
import React, { useState } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({loggedIn, onUpdateUser, onSignOut, errorMessage}) {
    const {
        values,
        setValues, 
        handleChange,
        errors,
        isValid,
        resetForm
    } = useForm(editProf, validate, "ep");
    const currentUser = React.useContext(CurrentUserContext);
    const [isDisabled, setIsDisabled] = useState(true);
    React.useEffect(() => {
        setValues({name:currentUser.name, email:currentUser.email});
    }, [currentUser]);

    function handleEdit() {
        setIsDisabled(false);
    }
    
    function editProf() {
        console.log('No errors, submit callback called!');
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name: values.name,
          email: values.email,
        });
        setIsDisabled(true);
    }

    function handleSignOut(){
        onSignOut()
    }
    return (
        <section className="profile">
            <form onSubmit={handleSubmit} noValidate>
                <h3 className="profile__title">{`Привет, ${currentUser.name}!`}</h3>
                <div className="profile__content">
                    <label htmlFor="user-name" className="profile__text">Имя</label>
                    <input className="profile__input"
                        id="user-name"
                        name="name"
                        type="text"
                        value={values.name || ''}
                        onChange={handleChange}
                        disabled = {isDisabled}
                        required>    
                    </input>
                </div>
                <span className={`${errors.name ? 'profile__text_error profile__text_errorName' : 'profile__text_visible'}`}>{errors.name}</span>
                <div className="profile__content">
                    <label htmlFor="user-email" className="profile__text">E-mail</label>
                    <input className="profile__input"
                        id="user-email"
                        name="email"
                        type="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        disabled = {isDisabled}
                        required>
                    </input>   
                </div>
                <span className={`${errors.email ? 'profile__text_error profile__text_errorEmail' : ''}`}>{errors.email}</span>
                <span className={`${errorMessage ? 'profile__error' : 'profile__text_visible'}`} >{errorMessage}</span>
                <button className={`${isDisabled ? 'profile__button' : 'profile__button_hidden'}`} type="button" aria-label="Редактировать профиль" onClick={handleEdit}>Редактировать</button>
                <button className={`${isDisabled ? 'profile__button  profile__button_exit' : 'profile__button_hidden'}`} type="button" aria-label="Выход из аккаунта" onClick={handleSignOut} >Выйти из аккаунта</button>
                <button className={`${isDisabled ? 'profile__button_hidden' : isValid ? 'profile__submit-button' : 'profile__submit-button profile__button_disabled'}`}
                    disabled={!isValid} type="submit">Сохранить</button>
            </form>
        </section>
    );
}

export default Profile;
