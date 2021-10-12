import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../../context/DataProvider';
import { fetchConToken } from '../../../helpers/fetch';
import { useForm } from '../../../hooks/useForm';
import '../../../styles/cuenta-usuario.css';
import { Footer } from '../../shared/Footer';
import { MyInput } from '../../ui/auth/MyInput';

export const CuentaUsuario = () => {

    const value = useContext(DataContext);

    const [ usuario ] = value.usuario;
    const [ carrito ] = value.carrito;

    const [ userValues , handleValueChange , , handleIsValidUs, , isValidUs, validPasswords ] = useForm({
        // email: 'prueba@gmail.com',
        // password: '123456'
    });

    const [pedidos, setPedidos] = useState(null)

    const expr = {
        usuario: /^[a-zA-Z0-9\_\-]{6,16}$/, // Letras, numeros, guion y guion_bajo
        direccion: /.{15,52}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-Z]{3,15} .{3,50}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{5,12}$/, // 4 a 12 digitos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }

    useEffect(() => {
       obtenerCompras();
    }, [carrito])

    const obtenerCompras = async() => {
        const { compras } = await (await fetchConToken(`compras/${usuario.id}`)).json();
       if(compras) {
           setPedidos([...compras])
       }
    }


    return (
        <div className='cuenta-cont fadeIn'>
            <div className='usuario-row'>
                <div className='col-datos'>
                    <h3 onClick={() => {
                        console.log(pedidos);
                    }}>Datos de usuario:</h3>
                    <form className='' id='editarUsuarioForm' onSubmit={ () => {} }> 
                         <MyInput
                            key='registroNYA'
                            labelTxt='Nombre y Apellidos'
                            type='text'
                            placeholder={usuario.fullname}
                            name='fullname'
                            error='Debe de tener al menos 1 apellido'
                            handleChange={handleValueChange}
                            isValid={ expr.nombre.test(userValues['fullname']) ? true : false }
                            handleVal={handleIsValidUs}
                          />
                          <MyInput
                            key='registroUsuario'
                            labelTxt='Nombre de Usuario'
                            type='text'
                            placeholder={usuario.username}
                            name='username'
                            error='Debe de tener al menos 6 caracteres alfanuméricos'
                            handleChange={handleValueChange}
                            isValid={ expr.usuario.test(userValues['username']) ? true : false }
                            handleVal={handleIsValidUs}
                          />
                          <MyInput
                            key='registroEmail'
                            labelTxt='Correo electrónico'
                            type='email'
                            placeholder={usuario.email}
                            name='email'
                            error='Debe de introducir un email válido'
                            handleChange={handleValueChange}
                            isValid={ expr.email.test(userValues['email']) ? true : false }
                            handleVal={handleIsValidUs}
                          />
                          <MyInput
                            key='registroTlf'
                            labelTxt='Tlfno'
                            type='tel'
                            placeholder={usuario.tlf}
                            name='tlf'
                            error='Debe de introducir un número válido'
                            handleChange={handleValueChange}
                            isValid={ expr.telefono.test(userValues['tlf']) ? true : false }
                            handleVal={handleIsValidUs}
                          />
                          <MyInput
                            key='registroDirection'
                            labelTxt='Dirección'
                            type='text'
                            placeholder={usuario.direction}
                            name='direction'
                            error='Debe de introducir una dirección válida'
                            handleChange={handleValueChange}
                            isValid={ expr.direccion.test(userValues['direction']) ? true : false }
                            handleVal={handleIsValidUs}
                          />
                          <MyInput
                            key='registroPassword'
                            labelTxt='Contraseña'
                            type='password'
                            placeholder='Su Contraseña ...'
                            name='password'
                            error='La contraseña debe de tener al menos 6 caracteres y coincidir'
                            handleChange={handleValueChange}
                            isValid={validPasswords() }
                            handleVal={handleIsValidUs}
                          />
                          <MyInput
                            key='registroPassword2'
                            labelTxt='Repetir Contraseña'
                            type='password'
                            placeholder='Su Contraseña ...'
                            name='password2'
                            error='La contraseña debe de tener al menos 6 caracteres y coincidir'
                            handleChange={handleValueChange}
                            isValid={ validPasswords() }
                            handleVal={handleIsValidUs}
                          />
                         <div className='formGroup'>
                            <button type='submit' className='btnSubmit' disabled={ !isValidUs() }>Editar</button>
                         </div>
                    </form>
                </div>
                <div className='col-pedidos'>
                   <h3>Tus Pedidos: </h3>
                    <div className='pedidos'>
                        {
                            pedidos?.map((pedido) => {
                                return (
                                    <div key={`pedido-${pedido.id}`} className='pedido'>
                                      
                                         <div className='img'>
                                             <img src={pedido.category === 'zapatillas' ?  `${pedido.img1}01${pedido.img2}` : `${pedido.img1}`} alt={`imagen producto ${pedido.productname}`} width='70' />
                                         </div>
                                        
                                        <div className='datos'>
                                            <p><span className='data-title'>Nombre del Producto:</span> { pedido.productname }</p>
                                            <p><span className='data-title'>Talla: </span>{ pedido.size }</p>
                                            <p><span className='data-title'>ID del pedido:</span> { pedido.id }</p>
                                            <p><span className='data-title'>Dirección de envío:</span> { pedido.direction }</p>
                                            <p><span className='data-title'>Estado del pedido</span>: { pedido.status }</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            pedidos?.length < 1 &&
                            <div className='pedido-alert'>
                                <h2>Vaya, parece que aún no tienes ningún pedido, te animamos a visitar nuestra tienda en el enlace de abajo !!</h2>
                                <Link className='btn'  to='/'>Visitar Tienda</Link>
                                
                            </div>
                        }
                    </div>
                </div>
            </div>
            < Footer />
        </div>
    )
}
