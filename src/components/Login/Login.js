import './login.css'
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom';

const Login = ({ onLogin, errorMessage, setErrorMessage, isLoading}) => {
    const {
        register,
        formState: { errors, isDirty, isValid },
        handleSubmit,
    } = useForm({mode:"onChange"});
    
    const onSubmit = (data) => {
        onLogin({ email: data.email, password: data.password })
    }
    const clearErrorLogin = () => {
        setErrorMessage('')
    }
    return (
        <section className="login">
            <form className="login__forma" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="login__title">Рады видеть!</h2>
                <label htmlFor="user-email" className="login__text">E-mail</label>    
                <input className="login__inputs login__inputs_email"
                    {...register('email', {
                        required: "Email должен быть заполнен",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,
                            message: "Email введен не корректно"
                    }
                    })} 
                    type="email"  
                    disabled={isLoading}
                />
                {errors?.email && <span className="login__text login__text_error login__text_errorEmail">{errors.email.message}</span>}
                <label htmlFor="user-password" className="login__text">Пароль</label>                
                <input className="login__inputs login__inputs_color"
                    {...register("password", {
                        required: "Пароль должен быть заполнен",
                        minLength: {
                            value: 2,
                            message: "Пароль должен быть более 2 знаков"},
                        maxLength: {
                            value: 30,
                            message: "Пароль должен быть не более 30 знаков"
                        }
                    })}
                    type="password" 
                    disabled={isLoading}
                />
                {errors?.password && <span className="login__text login__text_error login__text_errorPassword">{errors.password.message}</span>}
                <span className={`${errorMessage ? 'login__error' : 'login__text_visible'}`} >{errorMessage}</span>    
                <button className={`${Object.keys(errors).length === 0 ? 'login__submit-button' : 'login__submit-button login__submit-button_disabled'}`}
                    type="submit" disabled={!isDirty || !isValid} >Войти</button>
                <p className="login__text login__text_size">Ещё не зарегистрированы?
                <Link to='/sign-up' className="login__text login__text_size login__text_link" onClick={clearErrorLogin}>Регистрация</Link></p>
            </form>
        </section>
    );
}
export default Login;
