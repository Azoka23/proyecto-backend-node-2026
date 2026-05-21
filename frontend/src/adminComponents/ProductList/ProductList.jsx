import React, { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../services/Products";
import "./ProductList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [searchInput, setSearchInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // 👈 modal
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés borrar este producto?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    window.location.href = "/";
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Sugerencias autocomplete
  const suggestions = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchInput.toLowerCase()) &&
        searchInput !== "",
    )
    .slice(0, 6);

  const handleSelectSuggestion = (text) => {
    setSearchFilter(text);
    setSearchInput("");
    setShowSuggestions(false);
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchFilter(searchInput);
      setSearchInput("");
      setShowSuggestions(false);
      setPage(1);
    }
  };

  // Filtrado real
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.type.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  // --- EDIT MODAL HANDLERS ---
  const handleEditClick = (product) => {
    setEditingProduct({ ...product });
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  if (loading) {
    return <div className="loading-products">Cargando productos...</div>;
  }

  return (
    <div className="products-container">
      <h1 className="products-title">Gestión de Productos</h1>

      {/* Buscador */}
      <div className="search-box">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          placeholder="Buscar por nombre o categoría..."
          className="search-input"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setShowSuggestions(true);
            setPage(1);
          }}
          onKeyDown={handleKeyDown}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-list">
            {suggestions.map((p) => (
              <div
                key={p.id}
                className="suggestion-item"
                onClick={() => handleSelectSuggestion(p.name)}
              >
                {p.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid scrollable */}
      <div className="products-grid-container">
        <div className="products-grid">
          {filtered.length === 0 && (
            <div className="no-results">Producto no encontrado</div>
          )}

          {filtered.length > 0 &&
            paginated.map((p) => (
              <div key={p.id} className="product-card">
                {/* 🛠️ AJUSTE DE RUTA INTELIGENTE PARA IMÁGENES */}
                <img
                  src={
                    p.image
                      ? `http://localhost:3000/images/${p.image.replace(/^\/?(images\/)?/, "")}`
                      : "https://via.placeholder.com/200"
                  }
                  alt={p.name}
                />
                <div className="product-card-body">
                  <div className="product-category">{p.type}</div>
                  <h3 className="product-name">{p.name}</h3>
                  <div className="product-price">${p.price}</div>
                </div>
                <div className="product-card-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEditClick(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            ⬅ Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Siguiente ➡
          </button>
        </div>
      )}

      {/* Botones flotantes */}
      <div className="floating-buttons">
        <button
          className="floating-btn back-btn"
          onClick={() => window.history.back()}
        >
          🔙 Volver
        </button>
        <button className="floating-btn logout-btn" onClick={handleLogout}>
          🚪 Cerrar sesión
        </button>
      </div>

      {/* --- MODAL EDIT --- */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Producto</h2>
            <label>Nombre:</label>
            <input
              name="name"
              value={editingProduct.name}
              onChange={handleModalChange}
            />
            <label>Categoría:</label>
            <input
              name="type"
              value={editingProduct.type}
              onChange={handleModalChange}
            />
            <label>Precio:</label>
            <input
              name="price"
              type="number"
              value={editingProduct.price}
              onChange={handleModalChange}
            />
            <label>Imagen URL:</label>
            <input
              name="image"
              value={editingProduct.image}
              onChange={handleModalChange}
            />
            <div className="modal-buttons">
              <button className="btn btn-edit" onClick={handleSaveChanges}>
                Guardar
              </button>
              <button className="btn btn-delete" onClick={handleCancelEdit}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
