import React from 'react';
import './ShoppingCart.css'; 
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext'; 
 
 const ShoppingCart = () => {
  
  const { 
    cart, 
    clearCart, 
    getTotalItems,
    getTotalPrice, 
    removeItem,
    updateItemQuantity
  } = useCartContext();

  
  
  // LLAMAMOS A LA FUNCIÓN DEL CONTEXTO
  const totalPrice = getTotalPrice(); 

  // el panel es una vista
  return (
    <aside className="shopping-cart view-mode"> 
      
      
      
      <h2>Carrito de Compras</h2>
      
      <p>Total de Unidades: {getTotalItems()}</p> 
      
      {cart.length === 0 ? (
        <p>El carrito está vacío. ¡Agrega tus productos favoritos!</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((product) => (
              <li key={product.id} className="cart-item"> 
                
                {/* 🛑 NUEVO CONTENEDOR PARA IMAGEN Y TEXTO */}
                <div className="item-info-wrapper"> 
                    
                    {/* 1. Imagen en miniatura */}
                    <img 
                        
                        src={product.image} 
                        alt={product.name} 
                        className="cart-item-thumbnail" 
                    />

                    {/* 2. Información del Producto */}
                    <div className="item-info">
                        {product.name} 
                        <span className="item-details">
                            ({product.quantity} u.) - ${ (product.price * product.quantity).toFixed(2) }
                        </span>
                    </div>
                </div>
                
                {/* SECCIÓN DE CONTROLES (Originales con texto descriptivo) */}
                <div className="item-controls">
                  
                  {/* Botón para DECREMENTAR (QUITAR UNIDAD) */}
                  <button 
                    onClick={() => updateItemQuantity(product.id, product.quantity - 1)}
                    disabled={product.quantity <= 1} 
                    className="qty-button action-control" 
                  >
                    <span className="icon-symbol">-</span>
                    <span className="control-text">Quitar</span>
                  </button>
                  
                  {/* Botón para INCREMENTAR (AGREGAR UNIDAD) */}
                  <button 
                    onClick={() => updateItemQuantity(product.id, product.quantity + 1)}
                    disabled={product.quantity >= product.stock}
                    className="qty-button action-control" 
                  >
                    <span className="icon-symbol">+</span>
                    <span className="control-text">Agregar</span>
                  </button>
                  
                  {/* Botón para ELIMINAR COMPLETAMENTE */}
                  <button onClick={() => removeItem(product.id)} className="remove-button action-control">
                    <span className="icon-symbol">❌</span>
                    <span className="control-text">Eliminar</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          
          <h3>Total a Pagar: ${totalPrice.toFixed(2)}</h3>

          <div className="cart-actions"> 
            <button onClick={clearCart} className="clear-button">✖️ Vaciar Carrito</button>

            <Link to="/checkout" className="checkout-link"> 
              <button className="checkout-button">
                🛒 Finalizar Compra
              </button>
            </Link>
          </div>
        </>
      )}
    </aside>
  );
};

export default ShoppingCart;