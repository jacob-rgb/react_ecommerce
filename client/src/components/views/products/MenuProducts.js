import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Products } from './Products';

import '../../../styles/menuProducts.css'
import { DataContext } from '../../../context/DataProvider';
import { useParams } from 'react-router';
import { Footer } from '../../shared/Footer';

export const MenuProducts = () => {

    const params = useParams();
    const value = useContext(DataContext);
    let [ productos ] = value.productos;

    const [productoFinal, setProductoFinal] = useState([])
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [tallas, setTallas] = useState([]);
    const [rangoP, setRangoP] = useState(1000);
    const [marcas, setMarcas] = useState([]);
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [numPaginas, setNumPaginas] = useState([])

    const [marcasList, setmarcasList] = useState(['Adidas', 'nike', 'Artengo', 'Reebok', 'Lacoste', 'Boomerang', 'DC', 'Converse', 'North Face', 'Supreme', 'Kappa', 'Asics', 'Fila']);
    const [tallasList, settallasList] = useState(['S','M','L','X']);

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        switch (params.categoria) {
            case 'zapatillas':
                setmarcasList(['Adidas', 'nike', 'Artengo', 'Reebok', 'Lacoste', 'Boomerang', 'DC', 'Converse', 'North Face', 'Supreme', 'Kappa', 'Asics', 'Fila'])
                settallasList(['36','37','38','39','40','41','42','43','44','45']);
                
                break;
            
            case 'relojes':
                setmarcasList(['Casio', 'Festina', 'Rolex', 'Lotus', 'Swatch'])
                settallasList(['S','M', 'L'])
                 break;

            case 'mochilas':
                setmarcasList(['nike', 'Jordan', 'MATEIN', 'Fila', 'Artengo', 'Adidas', 'Reebok'])
                settallasList(['S', 'M', 'L']);
                 break;
            
            case 'gorras':
                setMarcas(['nike', 'Jordan', 'MATEIN', 'Fila', 'Artengo', 'Adidas', 'Reebok', 'Kappa'])
                settallasList(['S', 'M', 'L']);
               break;

            case 'pendientes':
                setmarcasList(['Coronas', 'wish'])
                settallasList(['M'])
             break;
        
            default:
                break;
        }
        return () => {
            setmarcasList([]);
            settallasList([])
          };
    }, [ params])

    useEffect(() => {
        resetFilterValues();
        setTimeout(() => {
            setProductoFinal([...productos.filter(producto => producto.category === params.categoria)])
        }, 0);
        return () => {
            setProductoFinal([]);
          };
    }, [ productos, params ])

    useEffect(() => {
        // setCurrentPage(0)
        calcularNumPags()
        return () => {
            setCurrentPage([]);
          };
    }, [productoFinal])

    const calcularNumPags = () => {
        if(productoFinal.length) {
            let numPags = Math.ceil( productoFinal.length / 10 );
            let array = [];
            for(let i = 0; i < numPags; i++) {
               array.push(i + 1)
            }
             setTimeout(() => {
                setNumPaginas(array)
             }, 0);
        }
    }

    const handlePaginaChange = (n) => {
        document.querySelector('.products-screen').scrollTo(0,0);
        setCurrentPage((n - 1) * 10)
    }

    const handleSearchChange = (e) => {
        setTerminoBusqueda(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if(terminoBusqueda === "") {
            return setProductoFinal([...productos.filter(producto => producto.category === params.categoria)]) ;
        }
        setProductoFinal([...productos.filter((producto) =>{ 
            if(producto.title.toLowerCase().includes(terminoBusqueda.toLocaleLowerCase()) && producto.category === params.categoria ) {
                return true
            }
            return false
         } )]);
    }

    const handleTallaChange = (e) => {
       if(e.target.checked) {
           setTallas([...tallas, e.target.value])
       } else {
        setTallas([...tallas.filter(talla => talla !== e.target.value)])
       }
    }

    const handleRangoChange = (e) => {
        setRangoP(e.target.value);
        // setProductoFinal([...productoFinal.filter(producto => producto.price < rangoP)])
        // if(productoFinal.length < 1) return setProductoFinal([ ...productos ])
    }

    const handleMarcasChange = (e) => {
        if(e.target.checked) {
              setMarcas([ ...marcas, e.target.value ]);
        } else {
             setMarcas([...marcas.filter(marca => marca !== e.target.value)])
        }
    }

    const handleFiltersSubmit = (e) => {
        e.preventDefault();

       setProductoFinal([...productos.filter((producto) => {
            if( producto.category === params.categoria  &&  producto.price < rangoP && ( marcas.includes(producto.marca) || marcas.length < 1) && comprobarTallas(producto) )  {
                return true
            }
            return false
       })])
    }

    const comprobarTallas = ( producto ) => {
        let tallasProducto = producto.sizes.split(',')
        if(tallasProducto.some( talla  => tallas.includes(talla)) || tallas.length < 1) {
            return true
        } else {
            console.log('false');
            return false
        }
        
    }
  

    const ordenarProds = ( e) => { 
        switch (e.target.name) {
            case 'buttondesc':
                setProductoFinal([...productoFinal.sort((a, b) => { return b.price - a.price})]);       
                break;
            case 'buttonasc':
                setProductoFinal([...productoFinal.sort((a, b) => { return a.price - b.price})]);       
                break;
            case 'buttonaz':
                setProductoFinal([...productoFinal.sort((a,b) => { return a.title[0].toLowerCase().localeCompare(b.title.toLowerCase()) })]);       
                break;
            case 'buttonza':
                setProductoFinal([...productoFinal.sort((a,b) => { return b.title[0].toLowerCase().localeCompare(a.title.toLowerCase()) })]);            
                break;
            default:
                break;
        }      
    }

    const handleFilterToggle = () => {
        if (!isFilterMenuOpen ) {
            document.querySelector('.products-menu').style.transform = `translateX(0)`;
            setIsFilterMenuOpen(true);
        } else {
            document.querySelector('.products-menu').style.transform = `translateX(-600px)`;
            setIsFilterMenuOpen(false);
        }
    }

    const resetFilterValues = () => {
        setTallas([]);
        setRangoP(1000);
        setMarcas([]);

        const checkbox = document.querySelectorAll('input[type="checkbox"');
        const rango = document.querySelector('input[type="range"]');

        rango.value = 1000;
        checkbox.forEach( item => {
            item.checked = false;
        })
    }

    return (
        <div className='productsView-container fadeIn'>
            <div className='products-menu'>
                 <button type='submit' className='closebtn' onClick={handleFilterToggle}><box-icon name='x'></box-icon></button>
                <form name='searchForm' className='searchForm' onSubmit={handleSearchSubmit} >
                    <div className='form-group'>
                        <input type='text' name='search' onChange={handleSearchChange} />
                        <button type='submit'><box-icon name='search'></box-icon></button>
                    </div>
                </form>
                <h2>Orden:</h2>
                <div className='orderList'>
                   <button type='button' name='buttondesc' onClick={ ordenarProds } > Precio De Mayor A Menor</ button>
                   <button type='button' name='buttonasc' onClick={ ordenarProds }> Precio De Menor A Mayor</ button>
                   <button type='button' name='buttonaz' onClick={ ordenarProds }> A - Z </ button>
                   <button type='button' name='buttonza' onClick={ ordenarProds }> Z - A </ button>
                </div>
                <h2>Filtros:</h2>
                <form name='FiltrosForm' className='filtrosForm'>
                <button type='submit' onClick={ handleFiltersSubmit }>Aplicar Filtros</ button>
                <h3>Marca:</h3>
                    <div className='form-group'>
                        <ul className='listaMarcas' >
                            {
                                marcasList.map((marca) => (
                                    <li key={marca}>
                                      <label htmlFor={marca}>{marca}</label>
                                      <input type='checkbox' name={marca} value={marca} onClick={handleMarcasChange} />
                                   </li>
                                ))
                            }
                        </ul>
                    </div>
                    <h3>Rango de Precio:</h3>
                    <div className='form-group'>
                        <input type='range' min='0' max='1000' step='50' defaultValue='1000' onChange={ handleRangoChange } />
                        <label htmlFor='min'> { rangoP } € </label>
                    </div>
                    <h3>Talla: </h3>
                    <div className='form-group'>
                        <ul className='lista-tallas'>
                            {
                                tallasList.map( (talla) => (
                                    <li key={'talla',talla}>
                                       <label htmlFor='tallas'>{ talla }</label>
                                       <input type='checkbox' name={ 'talla-',talla} value={ talla } onChange={handleTallaChange} />
                                  </li>
                                ))
                            }
                        </ul>
                    </div>
                </form>
            </div>
            <div className='products-screen'>
                {
                    productoFinal.length > 0 &&
                    < Products productsList={ [...productoFinal].slice(currentPage, (currentPage + 10)) } />
                }
                {
                   productoFinal.length < 1 &&
                   <div className='noProducts'>
                       <h2>No se ha encontrado ningún producto con los parámetro de búsqueda deseados</h2>
                       <button onClick={() => {setProductoFinal([...productos.filter(producto => producto.category === params.categoria)])}}>Volver a Cargar</button>
                   </div>
                }  
                {
                    productoFinal.length > 0 &&
                       <div className='pagination'>
                          <button type='button' disabled={currentPage <= 0} onClick={() => {if(currentPage > 0) {setCurrentPage(currentPage - 10)}}}><box-icon style={{width:'15px'}} name='left-arrow'></box-icon></button>
                          {
                              numPaginas.map(pag => (
                                  <button key={`buttonPag-${pag}`} type='button'  className={(currentPage / 10) === (pag - 1)? 'pagActive' : ''} onClick={ () => {
                                   handlePaginaChange(pag)
                                  } }>{pag}</button>
                              ))
                          }
                         <button type='button' disabled={currentPage + 10 >= Math.ceil(productoFinal.length / 10) * 10} onClick={() => {if(currentPage < Math.ceil(productoFinal.length / 10) ) {;setCurrentPage(currentPage + 10)}}}><box-icon style={{width:'15px'}} name='right-arrow'></box-icon></button>
                    </div>
                }
                < Footer />
            </div>
            <button className='filterButton' onClick={handleFilterToggle}>{ !isFilterMenuOpen ? (<> <span>Filtro</span> <box-icon name='filter'></box-icon> </>) : (<box-icon name='x' ></box-icon>)}</button>
        </div>
    )
}
