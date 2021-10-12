import React, { useEffect, useState } from 'react';

export const Cookies = () => {
    const [activo, setActivo] = useState(true);

    useEffect(() => {
        const cookie = RegExp(""+"acptdX"+"[^;]+").exec(document.cookie);
        const redeableCookie = decodeURIComponent(!!cookie ? cookie.toString().replace(/^[^=]+./,"") : "");
        if(redeableCookie === '1') {
            setActivo(false)
        }
    }, [])

    const handleAccept = () => {
        document.querySelector('.cookies-cont').classList.add('hiden');
        const expires = 60*60*24*30
        document.cookie = `acptdX=1; max-age=${expires}`;
    }

    const handleReject = () => {
        window.history.go(-1);
    }

    if(activo) {
        return (
            <div className='cookies-cont'>
               <div className='cookies-text'>
                  <p>Al hacer clic en "Aceptar todas las cookies", das tu consentimiento para que se almacenen cookies en tu dispositivo. Sirven para mejorar la navegación por el sitio, analizar el uso del mismo y ayudarnos a mejorar el marketing</p>
                  <div className='buttons'>
                      <button onClick={handleReject}>Rechazar</button>
                      <button className='accept' onClick={handleAccept}>Aceptar Cookies</button>
                  </div>
               </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}
