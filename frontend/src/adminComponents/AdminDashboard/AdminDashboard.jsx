// src/adminComponents/AdminDashboard/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 🔐 Consumimos tu AuthContext
import "./AdminDashboard.css";

export const AdminDashboard = () => {
  // Extraemos la función nativa que borra las llaves y resetea los estados de React
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log(
      "🔴 Forzando borrado estricto de credenciales de Administrador...",
    );

    // 1. Forzamos el borrado manual inmediato de tus llaves exactas del localStorage
    localStorage.removeItem("adminAuthToken");
    localStorage.removeItem("adminUser");

    // 2. Ejecutamos tu función del context para limpiar los estados internos de React
    if (logout) {
      logout();
    }

    // 3. Dejamos un mini delay de 100ms para asegurar que el navegador limpie el disco
    // y recién ahí redirigimos a la raíz pública con recarga limpia
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  return (
    <main style={{ padding: "20px", minHeight: "60vh" }}>
      <div className="dashboard-card">
        <h1>Panel de Administración 🔐</h1>
        <p>Bienvenido Administrador ¿en qué podemos ayudarte hoy?</p>

        <div
          style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}
        >
          <Link to="productos/crear" className="admin-action-btn">
            <span className="icon">➕</span>
            Crear Producto
          </Link>

          <Link
            to="productos/lista"
            className="admin-action-btn admin-action-secondary"
          >
            <span className="icon">🧾</span>
            Gestionar Productos
          </Link>
        </div>
      </div>

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
    </main>
  );
};
