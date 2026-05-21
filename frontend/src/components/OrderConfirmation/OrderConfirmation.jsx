import React from 'react';
import { useParams, Link } from 'react-router-dom';
// Asegúrate de crear este archivo CSS
import './OrderConfirmation.css'; 

export const OrderConfirmation = () => {
    // 1. Obtener el ID de la orden de la URL
    const { orderId } = useParams();

    return (
        <main className="confirmation-page">
            <div className="confirmation-container">
                <h2>¡Orden Generada con Éxito!</h2>
                <p className="message">
                    Tu pedido ha sido procesado. Te enviaremos un correo con los detalles.
                </p>
                
                <div className="order-details">
                    <p>Tu **Número de Orden** es:</p>
                    <p className="order-id-display">{orderId}</p>
                </div>
                
                <Link to="/" className="home-button">
                    Volver a la Tienda
                </Link>
            </div>
        </main>
    );
};