import React from 'react';
import { Link } from 'react-router-dom';


export const Footer = () => {
    return (
        <footer>
            <div className='footer'>
                <div className='col1'>
                    <h3>Aviso Legal</h3>
                    <ul>
                        <li><Link to='terms'>Términos y condicones</Link></li>
                        <li><Link to='privacy-policy'>Políticas de privacidad</Link></li>
                        <li><Link to='cookies-policy'>Políticas de Cookies</Link></li>
                    </ul>
                    <h3>Atención al cliente</h3>
                    <ul>
                        <li><Link to='faq'>Preguntas frecuentes</Link></li>
                        <li><Link to='envios-devoluciones'>Envíos y devoluciones</Link></li>
                    </ul>
    
                </div>
                <div className='col2'>
                    <h3>Contacto</h3>
                    <ul>
                        <li><p>Email: urbansports@shop.com </p></li>
                        <li><p>Tlf: 91 576 34 76</p></li>
                        <li><p>Tlf2: +34 675 443 892 </p></li>
                    </ul>
                </div>
                <div className='col3'>
                   <iframe title='mapa' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.9403253741475!2d-3.7079034843507714!3d40.432320262614546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42286088e063cb%3A0x62d861ad5e677d74!2sC%2F%20de%20Magallanes%2C%201%2C%2028015%20Madrid!5e0!3m2!1ses!2ses!4v1632734742999!5m2!1ses!2ses" width="100%" height="200" style={{border:'0', borderRadius:'10px'}} allowFullScreen="" loading="lazy"></iframe>
                </div>
                <div className='col4'>
                    <h3>Social Media</h3>
                    <ul>
                        <li><p><box-icon type='logo' name='twitter'></box-icon> Twitter</p></li>
                        <li><p><box-icon type='logo' name='facebook-square' ></box-icon> Facebook</p></li>
                        <li><p><box-icon type='logo' name='instagram-alt' ></box-icon> Instagram</p></li>
                    </ul>
                </div>
            </div>
            <div className='sub-footer'>
                <p>Copyright 2021 J.R.R - Dev, Todos los derechos reservados</p>
            </div>
        </footer>
    )
}
