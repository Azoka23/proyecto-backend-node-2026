// src/components/Footer/Footer.jsx

import './Footer.css'; 

export const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-content-wrapper">
                
                {/* 1. Sección de Marca y Redes Sociales */}
                <div className="footer-section footer-brand-social">
                    <h3>☕ Café Shop</h3>
                    <p className="footer-motto">La mejor pausa, a un clic de distancia.</p>
                    <div className="social-links">
    
    <a href="https://instagram.com" target="_blank" aria-label="Instagram">
        {/* Asegúrate de que la ruta coincida con tu estructura: /images/nombre_del_archivo.ext */}
        <img src="/images/instagram.ico" alt="Instagram" className="social-icon" />
    </a> 
    
    <a href="https://facebook.com" target="_blank" aria-label="Facebook">
        {/* CLAVE: Usamos tu ruta /images/facebook.ico */}
        <img src="/images/facebook.ico" alt="Facebook" className="social-icon" />
    </a>
    
    <a href="https://whatsapp.com" target="_blank" aria-label="Twitter">
        {/* Ajusta esta ruta si tienes un icono de Twitter/X */}
        <img src="/images/whatsapp.ico" alt="Twitter / X" className="social-icon" />
    </a>
</div>
                </div>
                
                {/* 2. Sección de Información Legal y Ayuda (Lo más importante para un E-Commerce) */}
                <div className="footer-section footer-legal">
                    
                    <ul>
                        <li><a href="/legal/terminos">Términos y Condiciones</a></li>
                        <li><a href="/legal/privacidad">Política de Privacidad</a></li>
                        <li><a href="/legal/faq">Preguntas Frecuentes</a></li>
                        <li><a href="/contacto">Contáctanos</a></li> 
                    </ul>
                </div>
                
            </div> {/* Fin de footer-content-wrapper */}

            <div className="footer-bottom">
                <p>
                    &copy; {new Date().getFullYear()} Café Shop. Creado por Marcela A A.
                </p>
                <p className="payment-info">Métodos de Pago: Visa | MasterCard | PayPal</p>
            </div>
        </footer>
    );
};