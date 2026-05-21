// src/components/login/Registro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Registro = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado para deshabilitar botones al enviar
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  // 🔄 Modificamos el handleSubmit para que sea ASYNC y hable con Node
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica de contraseñas igual que antes
    if (userData.password !== userData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      console.log("📡 Enviando datos de registro al Backend...", userData);

      // Conexión real con tu servidor Node local
      const response = await fetch(
        "http://localhost:3000/api/usuarios/registro",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: userData.nombre,
            email: userData.email,
            password: userData.password,
            rol: "cliente", // Por defecto, todos nacen con el rol cliente
          }),
        },
      );

      const resultado = await response.json();
      console.log("📥 Respuesta del servidor al registrar:", resultado);

      if (response.ok && resultado.status === "success") {
        alert("¡Registro exitoso en Firebase! Ahora podés iniciar sesión.");
        navigate("/login"); // Te manda a loguearte con tu nueva cuenta
      } else {
        setError(resultado.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("❌ Error de red en registro:", error);
      setError(
        "No se pudo conectar con el servidor. Asegúrate de tener Node encendido.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <h2>📝 Crear Cuenta</h2>
        <p>Completá tus datos para ser parte del club del café.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo:</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ej: Marcela Arroyo"
              value={userData.nombre}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              value={userData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={userData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "⌛ Registrando..." : "Registrarme"}
          </button>

          <button
            type="button"
            className="later-button"
            onClick={() => navigate("/login")}
            disabled={loading}
            style={{
              marginTop: "10px",
              background: "none",
              border: "none",
              color: "#6F4E37",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            ¿Ya tenés cuenta? Ingresá acá
          </button>
        </form>
      </div>
    </main>
  );
};
