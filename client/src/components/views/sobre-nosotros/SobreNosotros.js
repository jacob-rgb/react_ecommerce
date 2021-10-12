import React, { useEffect } from 'react';

import '../../../styles/sobre-nosotros.css'
import { Footer } from '../../shared/Footer';

export const SobreNosotros = () => {

    useEffect(() => {
        document.querySelector('body').scrollTo(0,0)
    }, [])

    return (
        <div className='sobre-nosotros-content fadeIn'>
            <div className='intro' >
               <div className='img'>

               </div>
               <div className='text'>
                    <h2>¿ Que quiénes somos ?</h2>
                    <p><b>URBANS</b> es un <b>nuevo proyecto</b> fruto de la colaboración entre un grupo de amigos, que surgió en principio, como un trabajo de fin de grado. Pero gracias al <b>esfuerzo</b>, la <b>dedicación</b> y cómo no, un poco de <b>amor por el trabajo</b>, nos fuimos desarrollando hasta llegar a ser ya más de 50 trabajadores.  </p>
                    <p>Nuestra labor es simple. Tratamos de proporcionar al <b>cliente</b> la máxima <b>satisfacción</b>, a través de productos minuciosamente escogidos de entre las <b>mejores marcas</b> del mercado actual; Para ello, no nos encargamos sólo de escoger los <b>diseños</b> más <b>vanguardistas</b>, si no que también nos preocupamos de comerciar con proovedores <b>concienciados</b> con nuestro <b>planeta</b> y con el <b>impacto medioambiental</b>, provocado en parte por la alta carga de residuos que la industria moderna genera a día de hoy.  </p>
               </div>
            </div>
            <div className='icono-section'>
                 <div className='iconos-row'>
                     <div className='icono-cont'>
                        <box-icon type='solid' name='truck' animation='tada-hover'></box-icon>
                        <h3>Envíos en 48 horas</h3>
                     </div>
                     <div className='icono-cont'>
                        <box-icon name='group' type='solid' animation='tada-hover' ></box-icon>
                        <h3>Equipo de soporte</h3>
                     </div>
                     <div className='icono-cont'>
                         <box-icon name='bar-chart-alt' animation='tada-hover' ></box-icon>
                         <h3>Constante desarrollo</h3>
                     </div>
                     <div className='icono-cont'>
                     <box-icon name='purchase-tag' type='solid' animation='tada-hover' ></box-icon>
                         <h3>Las mejores marcas</h3>
                     </div>
                 </div>
                 <div className='iconos-row'>
                      <div className='icono-cont'>
                        <box-icon name='world'animation='tada-hover' ></box-icon>
                        <h3>Envíos a todo el mundo</h3>
                      </div>
                      <div className='icono-cont'>
                         <box-icon  type='solid' name='florist' animation='tada-hover' ></box-icon>
                         <h3>Concienciados con nuestro planeta</h3>
                      </div>
                      <div className='icono-cont'>
                         <box-icon name='credit-card-front' type='solid' animation='tada-hover'  ></box-icon>
                         <h3>Paga a tu manera</h3>
                      </div>
                      <div className='icono-cont'>
                         <box-icon type='solid' name='offer' animation='tada-hover' ></box-icon>
                         <h3>Increibles ofertas y promociones</h3>
                      </div>
                 </div>
                 <h2 className='sociostitle'>Nuestros Socios</h2>
                 <div className='socios-section'>
                      <div className='socio-cont'>
                          <img src='https://cdn1.coppel.com/images/catalog/pr/1830052-1.jpg' alt='imagen socio 1' />
                          <h5>Alejandro Colmendar - <small>Products manager</small></h5>
                      </div>
                      <div className='socio-cont'>
                          <img src='https://cdn1.coppel.com/images/catalog/pr/1676072-1.jpg' alt='imagen socio 2' />
                          <h5>Rodrigo Navas - <small>Director de marketing</small></h5>
                      </div>
                      <div className='socio-cont'>
                          <img src='https://www.coppel.com/images/catalog/pr/1168952-1.jpg' alt='imagen socio 3' />
                          <h5>Jacobo Ramírez- <small>IT Manager</small></h5>
                      </div>
                      <div className='socio-cont'>
                          <img src='https://previews.123rf.com/images/vadymvdrobot/vadymvdrobot1709/vadymvdrobot170903750/86897633-sorprendido-mujer-feliz-mostrando-la-muestra-aceptable-en-la-c%C3%A1mara-sobre-fondo-blanco.jpg' alt='imagen socio 3' />
                          <h5>Alicia Domínguez - <small>Directora financiera</small></h5>
                      </div>
                 </div>
            </div>
            <Footer />
        </div>
    )
}
