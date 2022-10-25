import React from 'react';
import {Link} from 'react-router-dom';
import './register.css'
import useForm from "../../utils/UseForm";
import validate from '../../utils/LoginFormValidationRules';
const Register = ({ onRegister, errorRegister }) => {
    const {
        values, 
        handleChange,
        errors,
        isValid,
        resetForm
    } = useForm(register, validate, "rg");
    
    function register() {
        console.log('No errors, submit callback called!');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            onRegister({ name: values.name, email: values.email, password: values.password })
            resetForm()
        };
    }
   
    return (
        <section className="register">
            <form className="register__forma" onSubmit={handleSubmit} noValidate>
            <h2 className="register__title">Добро пожаловать!</h2>
            <label htmlFor="user-name" className="register__text">Имя</label>
            <input className="register__inputs"
                id="user-name"
                name="name"
                type="text"
                value={values.name || ''}
                onChange={handleChange}
                required />
            <label htmlFor="user-email" className="register__text">E-mail</label>    
            <span className={`${errors.name ? 'register__text register__text_error register__text_errorName' : 'register__text_visible'}`}>{errors.name}</span>  
            <input className="register__inputs register__inputs_email"
                id="user-email"
                name="email"
                type="email"
                value={values.email || ''}
                onChange={handleChange}
                required />
            <span className={`${errors.email ? 'register__text register__text_error register__text_errorEmail' : 'register__text_visible'}`}>{errors.email}</span>    
            <label htmlFor="user-password" className="register__text">Пароль</label>                
            <input className="register__inputs register__inputs_color"
                id="user-password"
                name="password"
                type="password"
                value={values.password || ''}
                onChange={handleChange} 
                required />
            <span className={`${errors.password ? 'register__text register__text_error register__text_errorPassword' : 'register__text_visible'}`}>{errors.password}</span>    
            <p className={`${errorRegister ? 'register__text register__text_error' : 'register__text_visible'}`} >Что-то пошло не так...</p>        
            <button className={`${isValid ? 'register__submit-button' : 'register__submit-button register__submit-button_disabled'}`}
                disabled={!isValid}
                type="submit">Зарегистрироваться</button>
            <p className="register__text register__text_size">Уже зарегистрированы?
                <Link to='/sign-up' className="register__text register__text_size register__text_link">Войти</Link></p>
        </form>
        </section>
    );
}
export default Register;
