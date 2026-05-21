// src/context/CartContext.jsx

import React, { createContext, useContext } from 'react';

import { useCart } from '../Hooks/useCart'; 


export const CartContext = createContext();


export const useCartContext = () => {
    // Usa 'useContext' para leer los datos del Contexto
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
    
    
    const cartProps = useCart(); 

    // El objeto 'value' contiene TODA la lógica y el estado del carrito (cart, addToCart, clearCart, etc.)
    return (
        <CartContext.Provider value={cartProps}>
            {children}
        </CartContext.Provider>
    );
};