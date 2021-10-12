import { useState } from "react";


export const useForm = ( initialState = {} ) => {
   

    const [values, setValues ] = useState(initialState);
    const [ validValues, setValidValues ] = useState([]);

    const reset = ( newFormState = initialState ) => {
        setValues(newFormState);
        setValidValues({});
    };

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });
    };
    
    const handleIsValid = ({ target }, isValid) => {
        setValidValues({
            ...validValues,
            [ target.name ]: isValid
        })
    }

    const isValidLogin = () => {
        if(
            validValues['username'] === true &&
            validValues['password'] === true
        ) {
            return true
        }

        return false
    }

    const isValidRegister = () => {
        if(
            validValues['fullname'] === true &&
            validValues['username'] === true &&
            validValues['email'] === true &&
            validValues['tlf'] === true &&
            validValues['direction'] === true 
        ) {
            return true
        }

        return false
    }

    const validPasswords = () => {
        if(!values['password2']?.length) {
            if( values['password']?.length > 5 ) {
                return true
            } else {
                return false
            }
        }
        if(!values['password']?.length) {
            if( values['password2']?.length > 5 ) {
                return true
            } else {
                return false
            }
        }
        if(values['password'] === values['password2'] && values['password']?.length > 5 && values['password2']?.length > 5) {
            return true;
        } 
        return false;
    }


    return [ values, handleInputChange, reset, handleIsValid, isValidLogin, isValidRegister, validPasswords ];
}