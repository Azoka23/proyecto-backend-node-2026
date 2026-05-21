import { useState } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  //  AÑADIR AL CARRITO 
  const addToCart = (productToAdd, quantity) => {
    
    const productId = String(productToAdd.id); 
    const itemQuantity = Number(quantity); 

    // Verificamos si ya existe, comparando siempre como Strings
    const isInCart = cart.some(item => String(item.id) === productId);

    if (isInCart) {
        // SI YA EXISTE (ACTUALIZAR CANTIDAD) 
        
        let stockAlert = false; 

        setCart(prevCart => {
            const newCart = prevCart.map(item => {
                if (String(item.id) === productId) { 
                    const newQuantity = item.quantity + itemQuantity;
                    
                    // Validación de stock
                    if (newQuantity > productToAdd.stock) {
                        alert(`Stock insuficiente. Máximo disponible: ${productToAdd.stock} unidades.`);
                        stockAlert = true; 
                        return item; 
                    }
                    
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            
            // Si hubo alerta, devolvemos el estado anterior (prevCart) sin cambios.
            if (stockAlert) {
                return prevCart;
            }

            // Si no hubo alerta, devolvemos el nuevo array (newCart).
            return newCart;
        });

    } else {
        // SI ES NUEVO (AGREGAR CON CANTIDAD)
        
        if (itemQuantity > productToAdd.stock) {
            alert(`No puedes agregar ${itemQuantity}. Solo hay ${productToAdd.stock} disponibles.`);
            return;
        }
        
        // Agrega el producto asegurando que el ID sea String y quantity Number
        const newProduct = { ...productToAdd, id: productId, quantity: itemQuantity }; 
        
        // Usa la función prevCart para agregar el nuevo ítem
        setCart(prevCart => [...prevCart, newProduct]);
    }
  };

  //  ELIMINA UN ÍTEM COMPLETO
  const removeItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => String(item.id) !== String(productId)));
  };
  
  //  MODIFICA LA CANTIDAD DE UN ÍTEM
  const updateItemQuantity = (productId, newQuantity) => {
    const newQuantityNumber = Number(newQuantity);
    setCart(prevCart => 
      prevCart.map(item => {
        if (String(item.id) === String(productId)) {
          const quantityToSet = Math.min(newQuantityNumber, item.stock);
          
          if (newQuantityNumber > item.stock) {
             alert(`Cantidad limitada por stock. Máximo: ${item.stock}.`);
          }
          
          return { ...item, quantity: quantityToSet };
        }
        return item;
      }).filter(item => item.quantity > 0) 
    );
  };
  
  //  OBTIENE EL NÚMERO TOTAL DE ÍTEMS
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

//precio total
  const getTotalPrice = () => {
    // Usamos exactamente la misma lógica de cálculo que tenías en ShoppingCart
    return cart.reduce((total, item) => {
        const price = item.price || 0;
        return total + (price * item.quantity);
    }, 0);
};
  
  // OTRAS FUNCIONES
  const clearCart = () => {
    setCart([]);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  // Retorna todas las variables y funciones
  return {
    cart,
    addToCart,
    removeItem,
    updateItemQuantity, 
    clearCart,
    isCartVisible,
    toggleCartVisibility,
    getTotalItems,
    getTotalPrice,
  };
}