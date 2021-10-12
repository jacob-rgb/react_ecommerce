import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { DataContext } from '../../../context/DataProvider';
import { fetchSinToken } from '../../../helpers/fetch';
import { useForm } from '../../../hooks/useForm';
import { MyInput } from './MyInput';

import { GoogleLogin } from 'react-google-login';

import logoFb from '../../../images/facebook.png';
import logoGoogle from '../../../images/google.png';


export const Auth = () => {
    const [ login, setLogin ] = useState(true);
    const value = useContext(DataContext);
    const [ authModal, setAuthModal ] = value.authModal;
    const [ , setUsuario ] = value.usuario;
    const [ LoginValues, handleLoginInputChange, resetLoginForm, handleIsValid, isValidLogin ] = useForm({
        // email: 'prueba@gmail.com',
        // password: '123456'
    });

    const [ RegisterValues, handleRegisterInputChange, resetRegisterForm, handleIsValidReg, , isValidRegister, validPasswords ] = useForm({
        // email: 'prueba@gmail.com',
        // password: '123456'
    });

    const expr = {
        usuario: /^[a-zA-Z0-9\_\-]{6,16}$/, // Letras, numeros, guion y guion_bajo
        direccion: /.{15,52}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-Z]{3,15} .{3,50}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{5,12}$/, // 4 a 12 digitos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }


    const handleClickOut = (e) => {
        if (!document.querySelector('.authCont').contains(e.target)) {
           setAuthModal(false);
           setLogin(true)
        }
    }

    const handleFormMode = () => {
        login ? setLogin(false) : setLogin(true) ;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
 
        const resp = await (await fetchSinToken('auth/login', LoginValues, 'POST')).json();
        if(!resp.ok) {
           Swal.fire({title:'Error', text:resp.msg, icon:'error', confirmButtonColor:'#2469ff'});
           resetLoginForm();
           return document.querySelector('form').reset();
        }
        
        localStorage.setItem('acc-t', resp.token);
        localStorage.setItem('usX', JSON.stringify(resp.usuario));
        await setUsuario(resp.usuario);
        Swal.fire({title:`Bienvenid@ ${resp.usuario.username}`, text:'', icon:'success', confirmButtonColor: '#2469ff'});
        resetLoginForm();
        setAuthModal(false);
    }

    const handleRegistro = async (e) => {
        e.preventDefault();
        const {direction, email, fullname, password, tlf, username} = RegisterValues;
        const reqBody = { direction, email, fullname, password, tlf, username };

        const resp = await (await fetchSinToken('auth/signup', { ...reqBody } , 'POST')).json();
        if (!resp.ok) {
          Swal.fire({title:'Error', text: resp.msg, icon: 'error', confirmButtonColor: '#2469ff'});
          resetRegisterForm();
          return document.querySelector('form').reset();
        } 
        
        localStorage.setItem('acc-t', resp.token);
        localStorage.setItem('usX', JSON.stringify(resp.savedUser));
        await setUsuario(resp.savedUser);
        Swal.fire({title:`Bienvenid@ ${resp.savedUser.username}`, text:'Su usuario ha sido creado correctamente', icon:'success', confirmButtonColor: '#2469ff'});
        resetRegisterForm();
        setAuthModal(false);
    }

    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
        authModal &&
        <div className='authModal fadeIn' onClick={ handleClickOut }>
            <div className='authCont'>
                {
                    login ? 
                    <>
                    <h2>Login</h2>
                    <form id='loginForm' className='authForm' onSubmit={ handleLogin }> 
                         <MyInput
                            key='loginUsario'
                            labelTxt='Nombre de Usuario'
                            type='text'
                            placeholder='Su nombre de Usuario...'
                            name='username'
                            error='El nombre de usuario debe de tener al menos 6 caracteres'
                            handleChange={handleLoginInputChange}
                            isValid={ expr.usuario.test(LoginValues['username']) ? true : false }
                            handleVal={handleIsValid}
                          />
                          <MyInput
                            key='loginPassword'
                            labelTxt='Contraseña'
                            type='password'
                            placeholder='Su contraseña...'
                            name='password'
                            error='Debe de tener al menos 6 caracteres alfanuméricos'
                            handleChange={handleLoginInputChange}
                            isValid={ expr.password.test(LoginValues['password']) ? true : false }
                            handleVal={handleIsValid}

                          />
                         <div className='formGroup'>
                            <button type='submit' className='btnSubmit' disabled={ !isValidLogin() } >Iniciar Sesión</button>
                         </div>
                    </form>
                    { !isValidLogin() && <p style={{marginTop:'10px', color:'grey'}}>* Rellene todos los campos para activar el botón</p >}
                    <p className='mensajeAbajo' onClick={ handleFormMode }>Aún no tienes cuenta ? Regístrate de manera totalmente gratuita !</p >
                    </>
                    :
                    <>
                    <h2 onClick={validPasswords}>Registro</h2>
                    <form className='authForm' id='registroForm' onSubmit={ handleRegistro }> 
                         <MyInput
                            key='registroNYA'
                            labelTxt='Nombre y Apellidos'
                            type='text'
                            placeholder='Introduza Nombre y Apellidos ...'
                            name='fullname'
                            error='Debe de tener al menos 1 apellido'
                            handleChange={handleRegisterInputChange}
                            isValid={ expr.nombre.test(RegisterValues['fullname']) ? true : false }
                            handleVal={handleIsValidReg}
                          />
                          <MyInput
                            key='registroUsuario'
                            labelTxt='Nombre de Usuario'
                            type='text'
                            placeholder='Su nombre de usuario ...'
                            name='username'
                            error='Debe de tener al menos 6 caracteres alfanuméricos'
                            handleChange={handleRegisterInputChange}
                            isValid={ expr.usuario.test(RegisterValues['username']) ? true : false }
                            handleVal={handleIsValidReg}
                          />
                          <MyInput
                            key='registroEmail'
                            labelTxt='Correo electrónico'
                            type='email'
                            placeholder='Su email...'
                            name='email'
                            error='Debe de introducir un email válido'
                            handleChange={handleRegisterInputChange}
                            isValid={ expr.email.test(RegisterValues['email']) ? true : false }
                            handleVal={handleIsValidReg}
                          />
                          <MyInput
                            key='registroTlf'
                            labelTxt='Tlfno'
                            type='tel'
                            placeholder='Su número de teléfono ...'
                            name='tlf'
                            error='Debe de introducir un número válido'
                            handleChange={handleRegisterInputChange}
                            isValid={ expr.telefono.test(RegisterValues['tlf']) ? true : false }
                            handleVal={handleIsValidReg}
                          />
                          <MyInput
                            key='registroDirection'
                            labelTxt='Dirección'
                            type='text'
                            placeholder='Su dirección ...'
                            name='direction'
                            error='Debe de introducir una dirección válida'
                            handleChange={handleRegisterInputChange}
                            isValid={ expr.direccion.test(RegisterValues['direction']) ? true : false }
                            handleVal={handleIsValidReg}
                          />
                          <MyInput
                            key='registroPassword'
                            labelTxt='Contraseña'
                            type='password'
                            placeholder='Su Contraseña ...'
                            name='password'
                            error='La contraseña debe de tener al menos 6 caracteres y coincidir'
                            handleChange={handleRegisterInputChange}
                            isValid={validPasswords() }
                            handleVal={handleIsValidReg}
                          />
                          <MyInput
                            key='registroPassword2'
                            labelTxt='Repetir Contraseña'
                            type='password'
                            placeholder='Su Contraseña ...'
                            name='password2'
                            error='La contraseña debe de tener al menos 6 caracteres y coincidir'
                            handleChange={handleRegisterInputChange}
                            isValid={ validPasswords() }
                            handleVal={handleIsValidReg}
                          />
                         <div className='formGroup'>
                            <button type='submit' className='btnSubmit' disabled={ !isValidRegister() }>Registrar</button>
                         </div>
                    </form>
                    { !isValidRegister() && <p style={{marginTop:'10px', color:'grey'}}>* Rellene todos los campos para activar el botón</p >}
                    <div className='socialMedia-btns'> 
                        <button type='button'><img src={logoFb} alt='logo Fb' width='70'/></button>
                        <button type='button'><img src={logoGoogle} alt='logo Fb' width='70'/></button>
                        {/* <GoogleLogin
                            clientId="301857384862-o1vua66sb1bi0t0gu7bp9ioi934cf1t0.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /> */}
                    </div>
                    <p className='mensajeAbajo' onClick={ handleFormMode }>Ya estás registrado ? Pulsa aquí para iniciar sesión !</p >
                    </>
                }
                <button type='button' className='exit' onClick={() => {setAuthModal(false)}}><box-icon name='x'></box-icon></button>
            </div>
        </div>
    )
}
