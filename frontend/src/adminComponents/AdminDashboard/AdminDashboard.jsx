// src/adminComponents/AdminDashboard/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

export const AdminDashboard = () => {

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    window.location.href = "/";
};

  return (
    <main style={{ padding: '20px', minHeight: '60vh' }}>
      <div className="dashboard-card">
        <h1>Panel de Administración 🔐</h1>
        <p>Bienvenido Administrador en que podemos ayudarte hoy?</p>

        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="productos/crear" className="admin-action-btn">
            <span className="icon">➕</span>
    Crear Producto
          </Link>

          <Link to="productos/lista" className="admin-action-btn admin-action-secondary">
  <span className="icon">🧾</span>
    Gestionar Productos
</Link>

        </div>
      </div>

       {/* Botones flotantes */}
      <div className="floating-buttons">
        <button className="floating-btn back-btn" onClick={() => window.history.back()}>
          🔙 Volver
        </button>
        <button className="floating-btn logout-btn" onClick={handleLogout}>
          🚪 Cerrar sesión
        </button>
      </div>
    </main>
  );
};
