import React, { useEffect, useMemo, useState } from 'react';

import { ProductItem } from '../products/ProductItem';

// import '../../../styles/products.css'

export const Products = ( {limit, productsList } ) => {

  const [productos, setProductos] = useState(productsList)
    
    if(limit) {
      setProductos([...productos.slice(productos.length - limit)])
    }

    useMemo(() => {
      setProductos(productsList)
    }, [productsList])

    return (
      <>

        <div className="productos fadeIn">
            {
                productos.map( producto => (
                    <ProductItem
                     key={producto.id}
                     producto={producto}
                      />  
                ))
            } 
        </div>
      </>
    )
}
