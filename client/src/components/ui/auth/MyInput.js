import React, { useState } from 'react';

export const MyInput = ({ labelTxt, type, placeholder, name, error, handleChange, isValid, handleVal }) => {

    const [valid, setValid] = useState(null)

    const handleStartChange = (e) => {
       setTimeout(() => {
        if (isValid) {  
            setValid(true)
            handleVal(e, true)
        } else {
            setValid(false);
            handleVal(e, false)
        } 
       }, 500);   
    }

    return (
    <div className='formGroup'> 
        <label htmlFor={ name }>{labelTxt}: </label>
        <input type={ type } id={ name } placeholder={placeholder} autoComplete='false' name={name} onChange={ handleChange } onKeyUp={ handleStartChange } />
        {
            valid === false  &&
            <span className='error'>* { error }</span>
        }
    </div>
    )
}
