import React from 'react';
import './Contacto.css';
import facebookIcon from '/images/facebook.ico'; 
import instagramIcon from '/images/instagram.ico'; 
import whatsappIcon from '/images/whatsapp.ico'; 
import gmailIcon from '/images/gmail.ico'; 
export const Contacto = () => {
    return (
        <main className="contacto-section">
            <h2> Contactate  con Nosotros</h2>
            <p>Teléfono: 0800-REACT-COFFEE</p>
            {/* Aca puedo  añadir un formulario de contacto */}
        <h3>Nuestras Redes</h3>
            <div className="social-icons">
                
                {/* Facebook */}
                <a href="URL_DE_FACEBOOK" target="_blank" rel="noopener noreferrer">
                    <img src={facebookIcon} alt="Facebook" className="social-icon-img" />
                </a>
                
                {/* Instagram */}
                <a href="URL_DE_INSTAGRAM" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram" className="social-icon-img" />
                </a>
                
                {/* WhatsApp */}
                <a href="URL_DE_WHATSAPP" target="_blank" rel="noopener noreferrer">
                    <img src={whatsappIcon} alt="WhatsApp" className="social-icon-img" />
                </a>

                {/* Gmail */}
                <a href="URL_DE_GMAIL" target="_blank" rel="noopener noreferrer">
                    <img src={gmailIcon} alt="Gmail" className="social-icon-img" />
                </a>
                
            </div>
        </main>
    );
};