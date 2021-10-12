import React, { createContext, useState, useEffect } from "react";
// import Data from '../Data';
import Swal from 'sweetalert2';
import { fetchSinToken } from "../helpers/fetch";

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [authModal, setAuthModal] = useState(false);
    const [productos, setProductos ] = useState([]);
    const [menu, setMenu] = useState(false);
    const [carrito, setCarrito ] = useState([]);
    const [total, setTotal ] = useState(0);
    const [usuario, setUsuario ] = useState({});


    useEffect(() => {
      if(localStorage.getItem('acc-t') && localStorage.getItem('usX')) {
          setUsuario({...JSON.parse(localStorage.getItem('usX'))})
      }
      getProducts();
    }, []);

    const getProducts = async () => {
        const { productos } = await (await fetchSinToken('products', {}, 'GET')).json();
        setProductos( productos )
    }

    const addCarrito = (id, talla) => {
        if(!talla) {
            return Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Seleccione una talla para el artículo',
                showConfirmButton: false,
                timer: 1000
            })
        }
        const check = carrito.every(item =>{
            return item.id !== id
        })
        if(check) {
            const data = productos.filter(producto => {
                return producto.id === id
            })
            const dataPlusCant = data.map(producto => {
                return {...producto, cantidad: 1, talla: talla}
            })
            setCarrito([...carrito, ...dataPlusCant]);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto añadido al carrito',
                showConfirmButton: false,
                timer: 1000
            })
        } else {
            Swal.fire('Aviso', 'Este producto ya está añadido al carrito')
        }
    }

    useEffect(() => {
       const dataCarrito = JSON.parse( localStorage.getItem('dataCarrito'));
    //    const dataCarritoC = document.cookie.split(';')[2];
       
       if(dataCarrito) {
            setCarrito(dataCarrito)
       } else {
            setCarrito([])
       }
    }, []);

    useEffect(() => {
        localStorage.setItem('dataCarrito', JSON.stringify(carrito));
        
        const dateNew = new Date().getTime();
        const expireDate = parseFloat(dateNew) + 2629750000;
        const stringData = new Date(expireDate);
        document.cookie = `dataCarritoC= ${JSON.stringify(carrito)} ; expires = ${stringData}`;

    }, [carrito]);

    useEffect(() => {
        const getTotal = () => {
            const res = carrito.reduce((prev, item) => {
                return prev + (item.price * item.cantidad)
            }, 0)
            return res
        }
        setTotal(getTotal())
    }, [carrito])

    const value = {
        productos: [productos],
        menu: [menu, setMenu],
        addCarrito: addCarrito,
        carrito: [carrito, setCarrito],
        total: [total, setTotal],
        authModal: [authModal, setAuthModal],
        usuario: [usuario, setUsuario ],
    }

    return (
        <DataContext.Provider value={ value }>
            {props.children}
        </DataContext.Provider>
    )
}