import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { DataContext } from '../../../context/DataProvider';
import { fetchConToken } from '../../../helpers/fetch';

export const Carrito = () => {
    const value = useContext(DataContext);
    const [menu, setMenu] = value.menu;
    const [ usuario ] = value.usuario;
    const [carrito, setCarrito] = value.carrito;
    const [total] = value.total;
    const [pedidos, setPedidos] = useState(null)

    const show1 = menu ? "carritos show" : "carritos";
    const show2 = menu ? "carrito show" : "carrito";

    useEffect(() => {
        setPedidos([ ...carrito.map(( producto ) => {
            return {
                user_id: usuario.id,
                product_id: producto.id,
                direction: usuario.direction,
                title: producto.title,
                size: producto.talla
            }
        }) ])
    }, [carrito, usuario])

    const handleCloseBodyClick = (e) => {
        if(document.querySelector('.carrito').contains(e.target)) {
        } else {
            setMenu(false);
        }
    }

    const handleCloseIconClick = () => {
        setMenu(false);
    }

    const removeProduct = (id) => {
        Swal.fire({
            title: 'Estás seguro',
            text: '¿ Deseas borrar este producto del carrito ?',
            icon: 'warning',
            confirmButtonText: 'Estoy seguro',
            confirmButtonColor: 'red',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
          }).then((value) =>{
            if(value.isConfirmed) {
                carrito.forEach((item, index) => {
                    if(item.id === id) {
                        item.cantidad = 1;
                        carrito.splice(index, 1)
                    }
                    setCarrito([...carrito])
                })
            } else {
                console.log('cancelled');
            }
          })
    }

    const sumarProducto = (id) => {

        carrito.forEach((item) => {
            if(item.id === id ) {
                item.cantidad += 1;
            }
            setCarrito([...carrito])
        })

    }

    const restarProducto = (id) => {

        carrito.forEach((item) => {
            if(item.id === id ) {
                item.cantidad === 1 ? item.cantidad = 1 : item.cantidad -= 1;
            }
            setCarrito([...carrito])
        })
        
    }

    const calcularCantidadProds = () => {
        let acumulador = 0 ;
        for(let i =  0; i < carrito.length; i++) {
            acumulador += carrito[i].cantidad
        }
        return acumulador
    }

    const handleRealizarPedido = async () => {
        if(pedidos.length > 0) {
           await pedidos.forEach( (pedido) => {
                    fetchConToken(`compras/add`, pedido, "POST").then((data) => {
                        data.json().then(data => {
                            if(!data.ok) {
                                return Swal.fire('Problema al realizar pedido', 'Si el problema persiste contacte con el admin del sitio web', 'warning');
                            } else {
                                setCarrito([]);
                                Swal.fire('Pedido realizado correctamente', 'pedido recibido !', 'info');
                            }
                        })
                }).catch(err => {
                    console.log(err);
                    return Swal.fire('Problema al realizar pedido', 'Si el problema persiste contacte con el admin del sitio web', 'warning');
                })
            })
        }
    }
    

    
    return (
        <div className={show1} onClick={ handleCloseBodyClick }>
            <div className={show2}>
                <div className="carrito__close">
                    <box-icon name="x" onClick={ handleCloseIconClick }></box-icon>
                </div>
                <h2 onClick={ () => { console.log(pedidos);}}>Tu Carrito <box-icon type='solid' name='cart'></box-icon></h2>
                <div className="carrito__center">
                   {
                       carrito.length === 0 ? 
                       <div className='carritoVacio'>
                           <h2>Añade algún producto a tu carrito</h2>
                       </div>
                        :
                       carrito.map( product => {
                           return (
                          <div className="carrito__item" key={product.id} > 
                            <img src={`${product.img1}01${product.img2}`} alt={product.id} />
                            <div>
                                <h3>{product.title}</h3>
                                <p className='talla'>Talla: { product.talla }</p>
                                <p className="price">{product.price}€</p>
                            </div>
                            <div className='carritoFlechasCantidad'>
                                <box-icon style={{width: '24px'}} type="solid" name="up-arrow" onClick={() => {sumarProducto(product.id)}} ></box-icon> 
                                <p className="cantidad">{product.cantidad}</p>
                                <box-icon style={{width: '24px'}} name="down-arrow" onClick={() => {restarProducto(product.id)}} ></box-icon>
                            </div>
                            <div className="remove__item" onClick={() => {removeProduct(product.id)}}>
                                 <box-icon style={{width: '30px', height: '30px', marginLeft: '8px'}} name="trash" color="red"></box-icon>
                            </div>
                          </div>
                           )
                       })
                   }
                </div>
                <div className="carrito__footer">
                    <img src='https://formacionenlactancia.com/wp-content/uploads/2020/06/pago-seguro-1.png' alt='pago seguro garantizado'/>
                    <div>
                      <h3>Nº de Artículos: <span style={{color: '#009945'}}>{calcularCantidadProds()}</span></h3>
                      <h3>Total: <span style={{color: '#009945'}}>{total}€</span></h3>
                      <button type="button" className="btn" onClick={ handleRealizarPedido }>Ir a Pago</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
