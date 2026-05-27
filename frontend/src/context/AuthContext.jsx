// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const TOKEN_KEY = "adminAuthToken";
const USER_KEY = "adminUser";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Mantenemos tu persistencia intacta: Al recargar la página chequea si hay sesión activa
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const storedUser = JSON.parse(localStorage.getItem(USER_KEY));

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  // 🔄 FUNCIÓN LOGIN CONECTADA A TU NUEVO MIDDLEWARE DE LA CLASE 15
  const login = async (email, password) => {
    try {
      console.log("📡 Enviando credenciales al Backend...", { email });

      // 1. Apuntamos a la nueva ruta de autenticación con JWT 🔒
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const resultado = await response.json();
      console.log("📥 Respuesta de autenticación recibida:", resultado);

      if (response.ok && resultado.token) {
        // 2. Armamos el objeto del usuario administrador fijo de la clase
        const usuarioAdaptado = {
          email: email,
          role: "administrador", // Le ponemos administrador directo para que React habilite las vistas
          nombre: "Administrador TechLab",
        };

        // 3. ¡Guardamos el TOKEN REAL (Bearer ...) en el localStorage! 🎯
        localStorage.setItem(TOKEN_KEY, resultado.token);
        localStorage.setItem(USER_KEY, JSON.stringify(usuarioAdaptado));

        setIsAuthenticated(true);
        setUser(usuarioAdaptado);

        return { success: true, user: usuarioAdaptado };
      } else {
        return {
          success: false,
          message: resultado.message || "Error de autenticación",
        };
      }
    } catch (error) {
      console.error("❌ Error de red al intentar loguear:", error);

      // 🚧 MODO DE PRUEBA / SIMULACRO (Por si el servidor de Node llega a estar apagado)
      console.warn(
        "Entrando en modo simulacro de emergencia por falla de red.",
      );

      if (password === "123") {
        let mockUser;
        if (email === "marcela@cafe.com") {
          mockUser = { email, role: "administrador", nombre: "Marcela Admin" };
        } else {
          mockUser = { email, role: "cliente", nombre: "Cliente de Café" };
        }

        localStorage.setItem(TOKEN_KEY, "token-falso");
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
        setIsAuthenticated(true);
        setUser(mockUser);

        return { success: true, user: mockUser };
      }

      return {
        success: false,
        message:
          "No se pudo conectar con el servidor y los datos de prueba fallaron.",
      };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
