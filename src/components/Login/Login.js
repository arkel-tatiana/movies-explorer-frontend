import React from 'react';
import {Link} from 'react-router-dom';
import './login.css'

import useForm from "../../utils/UseForm";
import validate from '../../utils/LoginFormValidationRules';

const Login = ({ onLogin }) => {
    const {
        values, 
        handleChange,
        errors,
        isValid,
        resetForm
    } = useForm(login, validate, "lg");
        
    function login() {
        console.log('No errors, submit callback called!');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            onLogin({ email: values.email, password: values.password })
            resetForm()
        };
    }
     
    return (
        <section className="login">
            <form className="login__forma" onSubmit={handleSubmit} noValidate>
                <h2 className="login__title">Рады видеть!</h2>
                <label htmlFor="user-email" className="login__text">E-mail</label>    
                <input className="login__inputs login__inputs_email"
                    id="user-email"
                    name="email"
                    type="email"
                    value={values.email || ''}
                    onChange={handleChange}
                    required/>
                <span className={`${errors.email ? 'login__text login__text_error login__text_errorEmail' : 'login__text_visible'}`}>{errors.email}</span>    
                <label htmlFor="user-password" className="login__text">Пароль</label>                
                <input className="login__inputs login__inputs_color"
                    id="user-password"
                    name="password"
                    type="password"
                    value={values.password || ''}
                    onChange={handleChange} 
                    required />
                <span className={`${errors.password ? 'login__text login__text_error login__text_errorPassword' : 'login__text_visible'}`}>{errors.password}</span>    
                <p className="login__text login__text_error login__text_visible">Что-то пошло не так...</p>        
                <button className={`${isValid ? 'login__submit-button' : 'login__submit-button login__submit-button_disabled'}`}
                    disabled={!isValid}
                    type="submit">Войти</button>
                <p className="login__text login__text_size">Ещё не зарегистрированы?
                <Link to='/sign-up' className="login__text login__text_size login__text_link">Регистрация</Link></p>
            </form>
        </section>
    );
}
export default Login;


