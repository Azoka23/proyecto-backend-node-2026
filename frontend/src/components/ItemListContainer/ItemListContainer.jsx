import React, { useState, useEffect } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/Products";
import "./ItemListContainer.css";

export const ItemListContainer = ({ titulo }) => {
  const { categoriaId } = useParams();
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getProducts(categoriaId)
      .then((data) => {
        console.log("DATOS LLEGANDO A REACT:", data); // Para ver tus 8 cafés en consola
        setListProducts(data);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoriaId]);

  const displayTitle = categoriaId
    ? `Categoría: ${categoriaId.toUpperCase()}`
    : titulo;

  return (
    <section className="item-list-container">
      <h1>{displayTitle}</h1>
      {isLoading && <p>Cargando productos...</p>}
      {error && <p className="error-message">⚠️ Error: {error}</p>}

      {!isLoading && !error && listProducts.length > 0 && (
        <ItemList lista={listProducts} />
      )}

      {!isLoading && !error && listProducts.length === 0 && (
        <p>No hay productos disponibles.</p>
      )}
    </section>
  );
};
