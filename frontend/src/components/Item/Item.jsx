import "./Item.css";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

export const Item = ({ id, name, type, price, stock, image, children }) => {
  // Importo la función addToCart del Contexto
  const { addToCart } = useCartContext();
  const isOutOfStock = stock === 0;

  // ============================================================
  // LÓGICA DE IMÁGENES (Ajustada con protección contra errores)
  // ============================================================

  // 1. Verificamos primero si 'image' existe y es un texto antes de usar startsWith
  // Si no existe, usamos una imagen gris de prueba para que no se rompa la página
  const urlImagen =
    image && typeof image === "string"
      ? image.startsWith("http")
        ? image
        : `http://localhost:3000/${image}`
      : "https://via.placeholder.com/300x200?text=Sin+Imagen";

  // Manejador del Evento de Agregar al Carrito
  const handleAddToCart = () => {
    const productToAdd = {
      id: String(id),
      name,
      price,
      image: urlImagen,
      stock,
    };

    addToCart(productToAdd, 1);
  };

  return (
    <article className="product-card">
      {/* --- Renderizado de la Imagen --- */}
      <div className="product-image-container">
        <img src={urlImagen} alt={name} className="product-image" />
      </div>

      <h2>{name}</h2>
      <p className="item-type">Tipo: {type}</p>

      {/* Mantenemos tu formato de precio */}
      <p className="item-price">
        Precio: <strong>${price}</strong>
      </p>

      {/* Aquí irían tus botones de Ver Detalle o Agregar al Carrito */}
      <div className="item-actions">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={isOutOfStock ? "btn-disabled" : "btn-add"}
        >
          {isOutOfStock ? "Sin Stock" : "Agregar al Carrito"}
        </button>

        {/* Ejemplo de Link al detalle si lo usas */}
        <Link title="Ver detalle" to={`/item/${id}`} className="btn-detail">
          Ver más
        </Link>
      </div>

      {children}
    </article>
  );
};
