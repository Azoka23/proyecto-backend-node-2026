import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(credentials.email, credentials.password);

    if (result.success) {
      // 🔀 LÓGICA DE REDIRECCIÓN SEGÚN ROL:
      // Usamos result.user que viene del simulacro que armamos en AuthContext
      if (result.user.role === "administrador") {
        navigate("/admin");
      } else {
        navigate("/"); // Si es un cliente común, vuelve a la tienda
      }
    } else {
      setError(result.message || "Credenciales incorrectas");
      setCredentials({ ...credentials, password: "" });
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <h2>☕ ¡Bienvenido a nuestra Cafetería!</h2>

        <p className="register-text">
          ¿No tenés una cuenta?{" "}
          <Link to="/registro" className="register-link">
            Registrate aquí
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Entrar
          </button>

          <button
            type="button"
            className="later-button"
            onClick={() => navigate("/")}
            style={{
              marginTop: "10px",
              background: "none",
              border: "none",
              color: "#6F4E37",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            ⬅ Volver a la tienda
          </button>
        </form>
      </div>
    </main>
  );
};
