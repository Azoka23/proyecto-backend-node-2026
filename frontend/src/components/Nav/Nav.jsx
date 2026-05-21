// src/components/Nav/Nav.jsx (CORREGIDO SIN ESTILOS EN LÍNEA TRABADOS)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./Nav.css";

export const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { getTotalItems } = useCartContext();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const categorias = [
    { id: "grano", nombre: "Café en Grano" },
    { id: "molido", nombre: "Café Molido" },
    { id: "capsulas", nombre: "Cápsulas" },
  ];

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <ul>
        {/* Dropdown Categorías */}
        <li className={`nav-dropdown ${isDropdownOpen ? "show-dropdown" : ""}`}>
          <Link to="#" onClick={toggleDropdown}>
            Categorías
          </Link>

          <ul className="dropdown-content">
            <li>
              <Link to="/" onClick={closeDropdown}>
                Ver Todo
              </Link>
            </li>

            {categorias.map(({ id, nombre }) => (
              <li key={id}>
                <Link to={`/categoria/${id}`} onClick={closeDropdown}>
                  {nombre}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* Contacto */}
        <li>
          <Link to="/contacto">Contactanos</Link>
        </li>

        {/* Carrito */}
        <li>
          <Link to="/carrito" className="nav-cart-icon-link">
            <img
              src="/images/carrito.png"
              alt="Carrito"
              className="cart-nav-image-icon"
            />
            <span className="cart-item-count-badge">({getTotalItems()})</span>
          </Link>
        </li>

        {/* 🔑 CONTENEDOR DE USUARIO SIN LOOPS DE ESTILOS */}
        {isAuthenticated ? (
          <li className="nav-user-container">
            {/* Quitamos los style={{}} viejos para que responda al CSS */}
            <span className="nav-user-name">
              Hola, {user?.nombre || "Usuario"}
            </span>
            <button onClick={handleLogout} className="nav-logout-button">
              Cerrar Sesión
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" className="nav-login-button">
              Ingresar
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
