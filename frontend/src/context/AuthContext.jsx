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

  // 🔄 FUNCIÓN LOGIN CONECTADA A TU BACKEND REAL Y FIREBASE
  const login = async (email, password) => {
    try {
      console.log("📡 Enviando credenciales al Backend...", { email });

      // 1. Apuntamos a la ruta real que creamos en tu servidor Node
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const resultado = await response.json();
      console.log("📥 Respuesta de autenticación recibida:", resultado);

      if (response.ok && resultado.status === "success") {
        // 2. Firebase devuelve "rol". Lo adaptamos a "role" ("administrador") para tu Frontend
        const usuarioAdaptado = {
          id: resultado.data.id,
          nombre: resultado.data.nombre,
          email: resultado.data.email,
          role: resultado.data.rol === "admin" ? "administrador" : "cliente",
        };

        // 3. Guardamos en localStorage y en el estado de React
        localStorage.setItem(TOKEN_KEY, "session-activa-firebase");
        localStorage.setItem(USER_KEY, JSON.stringify(usuarioAdaptado));

        setIsAuthenticated(true);
        setUser(usuarioAdaptado);

        return { success: true, user: usuarioAdaptado };
      } else {
        return { success: false, message: resultado.message };
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
