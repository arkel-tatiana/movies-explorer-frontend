import { useState, useEffect, useCallback } from 'react';
export function useForm(callback, validate, priz) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({email:' '});
    const [isValid, setIsValid] = useState(false);
    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValues({...values, [name]: value});
      setErrors(validate(values,priz))
    };
    useEffect(() => {
        Object.keys(errors).length === 0 ? setIsValid(true) : setIsValid(false);
    }, [errors]);
    
    const handleSubmit = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
    );
  
    return { values, handleChange, errors, isValid, handleSubmit, setIsValid };
  }


export default useForm;
