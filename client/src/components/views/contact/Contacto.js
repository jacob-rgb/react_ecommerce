import React from 'react';
import '../../../styles/contacto.css';
import { Footer } from '../../shared/Footer';

export const Contacto = () => {
    return (
    <>
    <div className="container">
		<div className="contact-box">
			<div className="left"></div>
			<div className="right">
				<h2>Contáctanos</h2>
				<input type="text" className="field" placeholder="Su Nombre..." />
				<input type="text" className="field" placeholder="Su Email" />
				<input type="text" className="field" placeholder="Su Número de tlf" />
				<textarea placeholder="Mensaje" className="field"></textarea>
				<button className="btn">Enviar</button>
			</div>
		</div>
	</div>
    <Footer />
    </>
    )
}
