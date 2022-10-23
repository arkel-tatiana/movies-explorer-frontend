export default function validate(values,priz) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email должен быть заполнен';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email введен не корректно';
    }
    if (priz!=="ep") {
       if (!values.password) {
            errors.password = 'Пароль должен быть заполнен';
        } else if (values.password.length < 2 && values.password.length > 0) {
            errors.password = 'Пароль должен быть более 2 знаков';
        } else if (values.password.length > 30) {
            errors.password = 'Пароль должен быть не более 30 знаков';
        }
    }
    if (priz!=="lg") {
        if (!values.name) {
            errors.name = 'Имя должно быть заполнено';
        } else if (values.name.length < 2 && values.name.length > 0) {
            errors.name = 'Имя должно быть более 2 знаков';
        } else if (values.name.length > 30) {
            errors.name = 'Имя должно быть не более 30 знаков';
        } else if (/[^a-zа-яё -]/iu.test(values.name)) {
          errors.name = 'Имя введено не корректно';    
        }
    }
    return errors;
};