import imgsectionhorizontal from '../../../images/imgsectionhor3.png';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../../context/DataProvider';
import video from '../../../images/Couple.mp4' ;

// import { Link } from 'react-router-dom';
import '../../../styles/home.css'

import {Carousel} from '../../shared/Carousel';
import { Footer } from '../../shared/Footer';

// import { Products } from '../products/Products';

export const Inicio = () => {
    const value = useContext(DataContext);
    const [ productos ] = value.productos;
    
    return (
        <div className="inicio fadeIn">
            <div className='videoSection row' >
                 <img src='https://elzocco.com/wp-content/uploads/2020/01/zapatillas-de-tenis-stycon.jpg' alt='imagenHeader Descuento Adidas' />
                 <div className='video'>
                    <video src={video} type="video/mp4" muted  autoPlay loop></video>
                 </div>
                    <div className='blackGradient'>
                        <h1>Descubre nuestras mejores ofertas en calzado deportivo</h1>
                        <button>Visitar Tienda</button>
                    </div>
            </div>
            <div className='nosotrosSection'>

            </div>
            <div className='categoriasSection mt-2'>
                    <div className='categoriasCont'>
                        <Link to='/productos/zapatillas' className='plus'>
                            <div className='categoria m-1'>
                                <img src='https://aws.glamour.es/prod/designs/v1/assets/original/657854.jpg' alt='categoria Zapatillas' />
                                <div className='categoriaDesc' >
                                    <h3>Zapatillas</h3>
                                </div>
                            </div>
                        </Link>
                        <Link to='/productos/mochilas'>
                            <div className='categoria m-1'>
                                <img src='https://ae01.alicdn.com/kf/H5c4090486f7542f09e7e7cde8ae6b7937/Mochila-De-Cuero-genuino-para-hombre-morral-para-viaje-oficina-trabajo-negocios.jpg' alt='categoria Mochilas' />
                                <div className='categoriaDesc' >
                                    <h3>Mochilas</h3>
                                </div>
                            </div>
                        </Link>
                        <Link to='/productos/gorras'>
                            <div className='categoria m-1'>
                                <img src='https://www.dhresource.com/0x0/f2/albu/g5/M00/95/B1/rBVaI1kw1XuABGr3AAFzUF7fsJ4096.jpg/wholesale-men-women-couple-baseball-cap-king.jpg' alt='categoria Gorras' />
                                <div className='categoriaDesc' >
                                    <h3>Gorras</h3>
                                </div>
                            </div>
                        </Link>
                        <Link to='/productos/relojes' className='plus'>
                            <div className='categoria'>
                                <img src='https://img.freepik.com/free-photo/couple-love_158595-2522.jpg?size=626&ext=jpg' alt='categoria Relojes' />
                                <div className='categoriaDesc' >
                                    <h3>Relojes</h3>
                                </div>
                            </div>
                        </Link>
                        <Link to='/productos/pendientes' className='plus'>
                            <div className='categoria'>
                                <img src='https://estaticos.marie-claire.es/media/cache/1140x_thumb/uploads/images/gallery/60d508f45cafe8598f3c6360/maxipendientes-rebajas-cabecera.jpg' alt='categoria Relojes' />
                                <div className='categoriaDesc' >
                                    <h3>Pendientes</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
            </div>
            <div className='newProducts'>
                <h1>Novedades</h1>
                < Carousel productosLista={ productos } />
            </div>
            <div className='seccion-imagen-horizontal'>
                <img src={ imgsectionhorizontal } alt='Mujeres deportistas y luchadoras' /> 
                <div className='gradient'>
                    <div>
                        <div>Encuentra la forma de</div> <div><div className='palabra-cambiante'><div className='palabra-cambiante-cont'><span>Expresarte</span><span>Liberarte</span><span>Conocerte</span></div></div></div>
                    </div>
                </div>   
            </div>
            <div className='newProducts'>
                <h1>Ofertas</h1>
                < Carousel productosLista={ productos.filter(producto => producto.offer) } />
            </div>
            < Footer />
        </div>
    )
}
