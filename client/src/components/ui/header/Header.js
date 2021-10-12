import React, { useContext, useEffect } from 'react';
import  Logo  from '../../../images/URBANS.png';
import { Link, useHistory } from 'react-router-dom';
import { DataContext } from '../../../context/DataProvider';
import Swal from 'sweetalert2';


export const Header = () => {

    const value = useContext(DataContext);
    const [ , setMenu ] = value.menu ;
    const [ carrito ] = value.carrito ;
    const [ authModal , setAuthModal ] = value.authModal ;
    const [ usuario, setUsuario ] = value.usuario;
    let history = useHistory();

    useEffect(() => {
      document.querySelector('body').addEventListener('scroll', handleAltura)
      return () => {
        document.querySelector('body').removeEventListener('scroll', handleAltura)
      }
    }, [])


    const handleCartClick = () => {
        setMenu(true)
    }

    const handleAuthClick = () => {
        authModal ? setAuthModal(false) : setAuthModal(true)
    }

    const toggleMenu = () => {
      const menu = document.querySelector('.dropdown-menu');
      const bar1 = document.querySelector('.menuBar1');
      const bar2 = document.querySelector('.menuBar2');
      const bar3 = document.querySelector('.menuBar3');

    //   menu.classList.remove('apparecerArriba');
      if(!menu.classList.contains('showMenu'))  {
        menu.classList.add('showMenu') ;
        bar1.style.transform = 'translateY(4px) rotate(-45deg)';
        bar1.style.background = 'red';
        bar2.style.transform = 'translateX(100px)';
        bar3.style.transform = 'translateY(-3px) rotate(45deg)';
        bar3.style.background = 'red';
      } else {
        menu.classList.remove('showMenu');
        bar1.style.transform = 'translateY(-4px) rotate(0deg)';
        bar1.style.background = 'black';
        bar2.style.transform = 'translateX(0px)';
        bar3.style.transform = 'translateY(4px) rotate(0deg)';
        bar3.style.background = 'black';
      }
    }

    const handleCerrarSesión = () => {
      localStorage.removeItem('usX');
      localStorage.removeItem('acc-t');
      Swal.fire({title:`Sesión cerrada correctamente`, text: `Hasta pronto, ${usuario.username} !!`, icon: 'success', confirmButtonColor: '#2469ff' }).then(() => {
        setUsuario({});
        history.push('/');
      });
    }

    const handleAltura = () => {
        if(window.innerWidth > 600) {
          if(document.querySelector('body').scrollTop > 100) {
            document.querySelector('.sub-menu').style.display = 'none';
          } else {
            document.querySelector('.sub-menu').style.display = 'flex';
          }
        }
    }

    return (
        <div className=''>
        <nav>
           <div className='main-menu'>
               <Link to="/">
                  <div className='logo'>
                      <img src={Logo} alt='nike logo' width='70' />
                  </div>
               </Link>
                <div className='iconsSection'>
                   < button type='button' className="dropdown-toggle" id="navbarDropdown" onClick={ toggleMenu }>
                     <div className='menuBar1'></div>
                     <div className='menuBar2'></div>
                     <div className='menuBar3'></div>
                   </button>
                   <div className='cart' onClick={ handleCartClick }>
                       <box-icon style={{width: '35px'}} name='cart' animation="tada-hover" ></box-icon>
                       <span className='item_total'>{ carrito.length }</span>
                   </div>
                </div>
           </div>
           <div className='sub-menu'>
              <Link className="dropdown-item" to='/productos/zapatillas'>Zapatillas</Link>
              <Link className="dropdown-item" to='/productos/mochilas'>Mochilas</Link>
              <Link className="dropdown-item" to='/productos/gorras'>Gorras</Link>
              <Link className="dropdown-item" to='/productos/relojes'>Relojes</Link>
              <Link className="dropdown-item" to='/productos/pendientes'>Pendientes</Link>
           </div>
        </nav>
        <ul className='dropdown-menu aparecerArriba' aria-labelledby="navbarDropdown" >
              <img src={Logo} alt='nike logo' width='120' style={{margin: '0 auto'}} />
              <li><Link className="dropdown-item" to='/'>Inicio</Link></li>
              <hr/>
              <li><Link className="dropdown-item" to='/sobre-nosotros'>Sobre Nosotros</Link></li>
              <hr />
              <li><Link className="dropdown-item" to='/contacto'>Contacto</Link></li>
              <hr />
              <li>
                <span>Productos</span>
                <ul className='submenu'>
                     <li><Link className="dropdown-item" to='/productos/zapatillas'>Zapatillas</Link></li>
                     <li><Link className="dropdown-item" to='/productos/mochilas'>Mochilas</Link></li>
                     <li><Link className="dropdown-item" to='/productos/gorras'>Gorras</Link></li>
                     <li><Link className="dropdown-item" to='/productos/relojes'>Relojes</Link></li>
                     <li><Link className="dropdown-item" to='/productos/pendientes'>Pendientes</Link></li>
                  </ul>
              </li>
              <hr/>
              <li>
               <span> Cuenta <box-icon name='user' flip='horizontal' animation='burst' ></box-icon></span>
                <ul className='submenu'>
                     {
                       !usuario.username ? 
                       <li><button type='button' className="dropdown-item loginBtn" onClick={ handleAuthClick }>Login / Registro</button></li>
                       :
                         <div>
                           <li><Link className="dropdown-item" to='/cuenta-usuario'>Acceder a Cuenta</Link></li>
                           <li><button type='button' className="dropdown-item loginBtn" onClick={ handleCerrarSesión }>Cerrar Sesión</button></li>
                         </div>
                     }
                  </ul>
              </li>
              <button type='button' className='exit' onClick={ toggleMenu }><box-icon name='x'></box-icon></button>
        </ul>
        </div>
    )
}
