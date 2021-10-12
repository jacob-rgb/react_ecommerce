import sslImg from '../../../images/IMAGEN-CS.png'

import React, {useContext, useEffect, useState} from 'react';
import { DataContext } from '../../../context/DataProvider';
import { useParams } from 'react-router-dom';

import { Swiper, SwiperSlide  } from 'swiper/react';
import SwiperCore, {
    Pagination, Navigation , Thumbs
} from 'swiper';
import { Footer } from '../../shared/Footer';
import { Carousel } from '../../shared/Carousel';

SwiperCore.use([Pagination, Navigation, Thumbs]);


export const Product = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

 const value = useContext(DataContext);
 const [ productos ] = value.productos;
 const addCarrito = value.addCarrito;

 const [ detalle , setDetalle ] = useState([]);
 const [url, setUrl ] = useState(0);
 const [images , setImages ] = useState('');
 const [pRelacionados , setPRelacionados ] = useState([]);
 const [tallas, setTallas] = useState(null);
 let tallaEscogida = null;


 const params = useParams();

 useEffect(() => {
    productos.forEach((producto) => {
        
        if(producto.id === parseFloat(params.id)) {
            setDetalle(producto);
            setTallas([...producto.sizes.split(',')])
            setUrl(0)
        }
    });
    document.querySelector('body').scrollTo(0,0)
 }, [params.id, productos])

 useEffect(() => {
    const values = `${detalle.img1}${url}${detalle.img2}`;
    setImages(values)
    setPRelacionados([...productos.filter(producto => detalle.category === producto.category && detalle.id !== producto.id)]);
 }, [url, params, detalle, productos])


 const handleInput = (e) => {
    const number = e.target.value.toString().padStart(2, '01');
    setUrl(number);
 }

 const handleTalla = (e) => {
     const sizeBtns = document.querySelectorAll('.btn-size');
     for(let i = 0; i < sizeBtns.length; i++) {
         sizeBtns[i].classList.remove('active');
        }
        e.target.classList.add('active'); 
        tallaEscogida = e.target.value;
    }
    

 if(detalle.length < 1) return null;

    return (
        <>
        <div className='cont'>
          <div className='detalleProducto-cont fadeIn'>
                 <div className='detalles fadeIn'>
                     <div className='cabecera-producto'>
                            {
                                detalle.category !== 'zapatillas' ?
                                  <div className='imgDiv'>
                                    <Swiper style={{'--swiper-navigation-color': '#fff','--swiper-pagination-color': '#fff'}} loop={true} spaceBetween={10} navigation={true} thumbs={{ swiper: thumbsSwiper }} className="mySwiper2">
                                       <SwiperSlide><img src={ detalle.img3 } alt='imgswip3'/></SwiperSlide>
                                       <SwiperSlide><img src={ detalle.img2 } alt='imgswip2'/></SwiperSlide>
                                       <SwiperSlide><img src={ detalle.img1 } alt='imgswip1'/></SwiperSlide>
                                    </Swiper>
                                    <Swiper onSwiper={setThumbsSwiper} loop={false} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} className="mySwiper22">
                                       <SwiperSlide><img src={ detalle.img3 } alt='imgswip3' style={{minHeight: '192px'}} /></SwiperSlide>
                                       <SwiperSlide><img src={ detalle.img2 } alt='imgswip2' style={{minHeight: '192px'}} /></SwiperSlide>
                                       <SwiperSlide><img src={ detalle.img1 } alt='imgswip1' style={{minHeight: '192px'}} /></SwiperSlide>
                                    </Swiper>
                                 </div>
                                 :
                                 <div className='imgDiv'>
                                    { url && detalle.category === 'zapatillas' ?   <img  src={images} alt={detalle.title}/> :  <img  src={`${detalle.img1}01${detalle.img2}`} alt={detalle.title} /> } 
                                    <input type='range' min='1' max='35' value={url} onChange={ handleInput }></input>
                                 </div>
                            }
                            <div className='descr-producto'>
                                <div className='descr-cont'>
                                       <div className='detalles-basicos'>
                                           <h3 style={{fontSize: '25px'}}> { detalle.title } </h3>
                                           <h3 className='price'> { detalle.price }€ <span className='offer-price'>{detalle.offer ? `${detalle.price -((detalle.price * detalle.offer) / 100)}€` : '' }</span> </h3>
                                           <div className='sizes-cont'>
                                               <h4>Seleccione una talla: </h4>
                                                 {
                                                     tallas?.map((size) => {
                                                         return (
                                                             <button key={`btnSize-${size}${Math.random()}`} value={size} className='btn-size' onClick={ (e) => {
                                                                 handleTalla(e);
                                                                //  setTallaEscogida(e.target.value)
                                                             } }>{size}</button>
                                                         )
                                                     })
                                                 }
                                           </div>
                                           <button className='addBtn' onClick={() => {addCarrito(detalle.id, tallaEscogida)}}>Añadir a la cesta</button>
                                       </div>
                                       <div className='detalles-profundidad'>
                                           <h3>Descripción del producto: </h3>
                                           <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s {detalle.descr}</p>
                                           <h3>Envios y Devoluciones </h3>
                                           <p><box-icon type='solid' name='truck'></box-icon> El envío podría retrasarse un poco. Revisa la fecha de entrega al pasar por caja.</p>
                                           <p><box-icon name='coin' ></box-icon> Puedes devolver tu pedido por cualquier motivo en un plazo de 60 días sin ningún coste.</p>
                                       </div>
                                </div>
                                <div className='propiedades-producto'>
                                    <h4>Propiedades y características: </h4>
                                    <ul>
                                        <li>Fabricante: {detalle.marca.toUpperCase()}</li>
                                        <li>Modelo: {detalle.title}</li>
                                        <li>Fabricación con material sintético y tela para una mayor durabilidad y ligereza.</li>
                                        <li>Control de pruebas de calidad aprobado por la OCM.</li>
                                    </ul>
                                </div>
                                <div className='iconos-pagoSeguro'>
                                            <img src={sslImg} alt='pagos seguros' />
                                </div>
                            </div>
                     </div>
                 </div>
            
            

            <h2 className='relacionados ' style={{textAlign:'center', marginTop: '2rem'}}>Puede que también te interese</h2>
            <Carousel productosLista={pRelacionados} />
         </div>
       </div>
       < Footer />
     </>
    )
}
