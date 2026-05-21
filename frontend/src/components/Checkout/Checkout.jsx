// src/components/Checkout/Checkout.jsx
import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useCartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; // 🔑 Importamos el contexto de login
import { Link, useNavigate } from "react-router-dom";

console.log("✅ Checkout.jsx cargado correctamente");

const validateForm = (data) => {
  const errors = {};

  if (!data.name.trim()) errors.name = "El nombre es obligatorio.";
  if (!data.phone.trim() || data.phone.trim().length < 8)
    errors.phone = "El teléfono es obligatorio y debe ser válido.";
  if (!data.email.trim()) {
    errors.email = "El email es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "El formato de email no es válido.";
  }

  return errors;
};

export const Checkout = () => {
  console.log("✅ Componente Checkout montado");

  const { cart, getTotalPrice, clearCart } = useCartContext();
  const { isAuthenticated, user } = useAuth(); // 🔑 Traemos la info de la sesión activa
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔑 EFECTO: Si el usuario inició sesión, autocompletamos nombre y email al cargar la pantalla
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        name: user.nombre || "",
        email: user.email || "",
        phone: "", // El teléfono lo dejamos vacío para que lo complete manualmente
      });
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🟡 Submit presionado. FormData:", formData);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    console.log("🔎 Errores encontrados:", validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("🛒 Productos del carrito:", cart);
      setLoading(true);

      try {
        const ordenDeCompra = {
          cliente: formData.name,
          carrito: cart,
          total: getTotalPrice(),
        };

        console.log("📡 Enviando orden al Backend...", ordenDeCompra);

        const response = await fetch("http://localhost:3000/api/ventas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ordenDeCompra),
        });

        const resultado = await response.json();
        console.log("📥 Respuesta del servidor:", resultado);

        if (response.ok && resultado.status === "success") {
          const orderIdReal = resultado.data.idVenta;
          console.log(
            "🎯 ¡Orden guardada en Firebase exitosamente! ID:",
            orderIdReal,
          );

          clearCart();
          navigate(`/order-confirmation/${orderIdReal}`);
        } else {
          alert("Hubo un problema al procesar tu compra. Inténtalo de nuevo.");
        }
      } catch (error) {
        console.error(
          "❌ Error de red o del servidor al conectar con la API:",
          error,
        );
        alert(
          "No se pudo conectar con el servidor. Asegúrate de tener Node encendido.",
        );
      } finally {
        setLoading(false);
      }
    }
  };

  console.log("🛒 Cart actual:", cart);

  if (!cart || cart.length === 0) {
    console.warn("⚠️ Carrito vacío");
    return (
      <main className="checkout-page empty-cart">
        <h2>Carrito Vacío</h2>
        <p>No tienes productos para finalizar la compra.</p>
        <Link to="/" className="confirm-button">
          Volver a la tienda
        </Link>
      </main>
    );
  }

  const totalPrice = getTotalPrice();
  console.log("💰 Total calculado:", totalPrice);

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h2>🛒 Finalizar Pedido</h2>
        <p>Completa tus datos para confirmar la orden.</p>

        <div className="order-summary">
          <h3>Resumen de la Compra</h3>
          {cart.map((item) => (
            <p key={item.id} className="summary-item">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </p>
          ))}
          <div className="order-total">
            Total a Pagar: **${totalPrice ? totalPrice.toFixed(2) : "0.00"}**
          </div>
        </div>

        <form onSubmit={handleSubmit} className="buyer-form">
          <div className="form-group">
            <label>Nombre Completo:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading || isAuthenticated} // 🔑 Bloqueado si ya inició sesión para evitar errores
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={loading}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading || isAuthenticated} // 🔑 Bloqueado si ya inició sesión
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <button type="submit" className="confirm-button" disabled={loading}>
            {loading
              ? "⌛ Procesando orden..."
              : "✔️ Confirmar y Generar Orden"}
          </button>
        </form>
      </div>
    </main>
  );
};
