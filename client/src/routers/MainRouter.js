import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { Contacto } from '../components/views/contact/Contacto';
import { CuentaUsuario } from '../components/views/cuenta-usuario/CuentaUsuario';
import { Inicio } from '../components/views/inicio/Inicio';
import { MenuProducts } from '../components/views/products/MenuProducts';
// import { Products } from '../components/views/products/Products';
import { Product } from '../components/views/singleProduct/Product';
import { SobreNosotros } from '../components/views/sobre-nosotros/SobreNosotros';
import { DataContext } from '../context/DataProvider';

export const MainRouter = () => {
    const value = useContext(DataContext);
    const [ usuario ] = value.usuario;

    return (
        <section>
            <Switch>

               <Route path="/" exact component={Inicio} />
                 
               <Route path="/productos/:categoria" exact component={MenuProducts} />

               <Route path="/productoDetalles/:id" exact component={Product} />

               <Route path="/sobre-nosotros" exact component={SobreNosotros} />

               <Route path="/contacto" exact component={Contacto} />

               <Route path="/cuenta-usuario" exact render={() => {
                   return  usuario && localStorage.getItem('acc-t') ?  <CuentaUsuario /> : <Redirect to="/" />
               } } />


            </Switch>
        </section>
    )
}
