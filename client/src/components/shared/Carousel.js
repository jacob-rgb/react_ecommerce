import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide  } from 'swiper/react';
import SwiperCore, {
    Pagination ,Navigation
} from 'swiper';

import 'swiper/swiper.min.css';
import "swiper/components/navigation/navigation.min.css"
import './shared.css'
import { ProductItem } from '../views/products/ProductItem';

SwiperCore.use([Pagination ,Navigation]);


export const Carousel = ({productosLista}) => {

    const [objectsPerPage, setobjectsPerPage] = useState(4);

    const  productos  = productosLista;

    useEffect(() => {
        if(window.innerWidth < 1400 && window.innerWidth  > 1000) {
            setobjectsPerPage(3)
        } else if (window.innerWidth  < 1000 && window.innerWidth > 450) {
            setobjectsPerPage(2)
        } else if (window.innerWidth < 450 ) {
            setobjectsPerPage(1)
        }
    }, [])


    return (
        <Swiper
        className='newsSwipper'
        navigation={true}
        spaceBetween={50}
        slidesPerView={objectsPerPage}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        >
           {
               productos.slice(productos.length - 9, productos.length).map(producto => (
                   <SwiperSlide key={producto.id}>
                       <ProductItem producto={producto} />
                   </SwiperSlide>
               ))
           }
      </Swiper>

    )
}
