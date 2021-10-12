import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../../context/DataProvider';


export const ProductItem = ( { producto } ) => {

    const value = useContext(DataContext);
    const addCarrito = value.addCarrito;
    const [modalTalla, setmodalTalla] = useState(false);
    
    return (
        <div className='producto-cont fadeIn'>
            <div className="producto">
                <div className='producto_front'>
                     <Link to={`/productoDetalles/${producto.id}`}>
                       {
                           producto.category === 'zapatillas' ?
                             <div className="producto__img">
                                 <img src={`${producto.img1}01${producto.img2}`} alt={producto.title} />
                             </div>
                             :
                             <div className="producto__img">
                                <img src={producto.img1} alt={producto.title} />
                             </div>
                       }
                     </Link>
                     <div className="producto__footer">
                         <h1> {producto.title} </h1>
                         <p>{producto.marca}</p>
                         <p className="price">{producto.price}€ { producto.offer && <span className='offer-price'>{producto.price + (producto.offer * producto.price / 100)}€</span>}</p>
                     </div>
                </div>
                <div className='producto_back' style={producto.img3  ?{backgroundImage: `url('${producto.img3}')`} : {backgroundImage: `url('${producto.img1}07${producto.img2}')`} }>
                <Link to={`/productoDetalles/${producto.id}`}>
                    <button type='button' >Ver Producto</button>
                </Link>
                    <button type='button' className='green'  onClick={() => { setmodalTalla(true) }}>Añadir Al Carrito</button>
                </div>
                {
                    producto.offer && 
                    <div className='offer-icon'>
                      {producto.offer} %
                    </div>
                }
          </div>
          {
              modalTalla &&
              <div className='modalTalla'>
                <h3>Seleccione Talla:</h3>
                <div className='tallas'>
                    {
                        producto.sizes.split(',').map((size) => {
                            return (
                                <button key={`btn-size-${size}`} type='button' className='btn-size' onClick={() => {addCarrito(producto.id, size); setmodalTalla(false)}}>{ size }</button>
                            )
                        })
                    }
                </div>
                <button type='button' className='exit' onClick={() => { setmodalTalla(false) }}><box-icon name='x'></box-icon></button>
             </div>
          }
        </div>
    )
}
