import './profile.css'
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({state, loggedIn, onUpdateUser, onSignOut, errorMessage, setErrorMessage, isLoading}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [isDisabled, setIsDisabled] = useState (true)
    const {
        register,
        formState: {
            errors,
            isDirty,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({mode:"onChange", defaultValues: { name: currentUser.name, email: currentUser.email}});

    useEffect(() => {
        reset(currentUser)
    }, [currentUser])

    function handleEdit() {
        setIsDisabled(false);
    }
    
    const onSubmit = (data) => {
        if ((data.name !== currentUser.name) || (data.email !== currentUser.email)) {
            onUpdateUser({ name: data.name, email: data.email })
            setErrorMessage("Ваши данные уcпешно сохранены")
            setIsDisabled(true);
        } else {
            setErrorMessage("Вы не изменили свои данные. Сохранение отменено")
        }
        
    }
    
    function handleSignOut(){
        onSignOut()
    }
    return (
        <section className="profile">
            <form onSubmit={handleSubmit(onSubmit)} >
                <h3 className="profile__title">{`Привет, ${currentUser.name}!`}</h3>
                <div className="profile__content">
                    <label htmlFor="user-name" className="profile__text">Имя</label>
                    <input className="profile__input"
                     {...register("name", {
                        minLength: {
                            value: 2,
                            message: "Имя должно быть более 2 знаков"},
                        maxLength: {
                            value: 30,
                            message: "Имя должно быть не более 30 знаков"
                        },
                        pattern: {
                            value: /^[A-Za-zА-Яа-я ]+$/,
                            message: "Имя введено не корректно"
                        },
                        required: "Имя должно быть заполнено"
                    })}
                    type="text"
                    disabled = {isDisabled || isLoading}>
                    </input>
                </div>
                {errors?.name && <span className="profile__text_error profile__text_errorName">{errors.name.message}</span>}
                <div className="profile__content">
                    <label htmlFor="user-email" className="profile__text">E-mail</label>
                    <input className="profile__input"
                        {...register('email', {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,
                                message: "Email введен не корректно"
                        },
                        required: "Email должен быть заполнен"
                        })}
                        disabled = {isDisabled || isLoading}
                        type="email">
                    </input>   
                </div>
                {errors?.email && <span className="profile__text_error profile__text_errorEmail">{errors.email.message}</span>}
                <span className={`${errorMessage ? 'profile__error' : 'profile__text_visible'}`} >{errorMessage}</span>
                <button className={`${isDisabled ? 'profile__button' : 'profile__button_hidden'}`} type="button" aria-label="Редактировать профиль" onClick={handleEdit}>Редактировать</button>
                <button className={`${isDisabled ? 'profile__button  profile__button_exit' : 'profile__button_hidden'}`} type="button" aria-label="Выход из аккаунта" onClick={handleSignOut} >Выйти из аккаунта</button>
                <button className={`${isDisabled ? 'profile__button_hidden' : isValid ? 'profile__submit-button' : 'profile__submit-button profile__button_disabled'}`}
                    disabled={!isDirty || !isValid} type="submit">Сохранить</button>
            </form>
        </section>
    );
}

export default Profile;
