import './register.css'
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom';
    
const Register = ({ onRegister, errorRegister, errorMessage, setErrorMessage, isLoading }) => {
    const {
        register,
        formState: { errors, isDirty, isValid },
        handleSubmit,
    } = useForm({mode:"onChange"});
    
    const onSubmit = (data) => {
        onRegister({ name: data.name, email: data.email, password: data.password })
    }
    const clearErrorRegister = () => {
        setErrorMessage('')
    }
    return (
        <section className="register">
            <form className="register__forma" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="register__title">Добро пожаловать!</h2>
                <label htmlFor="user-name" className="register__text">Имя</label>
                <input className="register__inputs"
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
                    disabled={isLoading}
                    type="text"
                />
                {errors?.name && <span className="register__text register__text_error register__text_errorName">{errors.name.message}</span>}
                <label htmlFor="user-email" className="register__text">E-mail</label>    
                <input className="register__inputs register__inputs_email"
                   {...register('email', {
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,
                        message: "Email введен не корректно"
                    },
                    required: "Email должен быть заполнен"
                })}
                disabled={isLoading}
                type="email"   
                />
                {errors?.email && <span className="register__text register__text_error register__text_errorEmail">{errors.email.message}</span>}
                <label htmlFor="user-password" className="register__text">Пароль</label>                
                <input className="register__inputs register__inputs_color"
                    {...register("password", {
                        minLength: {
                            value: 2,
                            message: "Пароль должен быть более 2 знаков"},
                        maxLength: {
                            value: 30,
                            message: "Пароль должен быть не более 30 знаков"
                        },
                        required: "Пароль должен быть заполнен"
                    })}
                    disabled={isLoading}
                    type="password" 
                />
                {errors?.password && <span className="register__text register__text_error register__text_errorPassword">{errors.password.message}</span>}
                <p className={`${errorRegister ? 'register__text register__text_error' : 'register__text_visible'}`} >Что-то пошло не так...</p>
                <span className={`${errorMessage ? 'register__error' : 'register__text_visible'}`} >{errorMessage}</span>        
                <button className={`${Object.keys(errors).length === 0 ? 'register__submit-button' : 'register__submit-button register__submit-button_disabled'}`}
                    type="submit" disabled={!isDirty || !isValid} >Зарегистрироваться</button>
                <p className="register__text register__text_size">Уже зарегистрированы?
                <Link to='/sign-in' className="register__text register__text_size register__text_link" onClick={clearErrorRegister}>Войти</Link></p>
            </form>
        </section>

    );
}
export default Register;
