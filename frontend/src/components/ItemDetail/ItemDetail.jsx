// src/components/ItemDetail/ItemDetail.jsx (CORREGIDO CON RUTA DE IMAGEN)

import React from "react";
import "./ItemDetail.css";
import { useCartContext } from "../../context/CartContext";

export const ItemDetail = ({
  id,
  name,
  type,
  price,
  description,
  stock,
  image,
}) => {
  const { addToCart } = useCartContext();
  const isOutOfStock = stock === 0;

  // ============================================================
  // LÓGICA DE IMÁGENES (Para conectar con tu servidor de Node)
  // ============================================================
  const urlImagen =
    image && typeof image === "string"
      ? image.startsWith("http")
        ? image
        : `http://localhost:3000/${image}`
      : "https://via.placeholder.com/300x200?text=Sin+Imagen";

  // Definir la función handleAddToCart usando la URL corregida
  const handleAddToCart = () => {
    const productToAdd = {
      id: String(id),
      name,
      price,
      stock,
      image: urlImagen, // Guardamos la URL correcta en el carrito
    };
    const quantityToAdd = 1;
    addToCart(productToAdd, quantityToAdd);
  };

  return (
    <div className="item-detail">
      <div className="detail-image-container">
        {/* 🔑 Usamos urlImagen en lugar de image a secas */}
        <img src={urlImagen} alt={name} className="detail-image" />
      </div>

      <div className="detail-info">
        <h1>{name}</h1>
        <p className="detail-price">Precio: **${price}**</p>
        <p className="detail-description">{description}</p>
        <p className="detail-type">Tipo: {type}</p>
        <p
          className="detail-stock"
          style={{ color: isOutOfStock ? "red" : "green" }}
        >
          Stock: {isOutOfStock ? "Agotado" : stock}
        </p>

        <button
          className="detail-add-button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          {isOutOfStock ? "SIN STOCK" : "Agregar al Carrito"}
        </button>
      </div>
    </div>
  );
};
