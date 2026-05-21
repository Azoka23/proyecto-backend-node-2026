// src/components/ProtectedRoute/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

// Este componente ahora recibe el 'requiredRole' (ej: "dueño")
export const ProtectedRoute = ({ element, requiredRole }) => {
    
    // Obtenemos el estado de autenticación y el objeto completo del usuario
    const { isAuthenticated, user } = useAuth(); 

    // 1. Verificación de Autenticación
    if (!isAuthenticated) {
        // Si NO está autenticado, lo redirigimos a la página de login.
        return <Navigate to="/login" replace />; 
    }

    // 2. Verificación de Rol (CLAVE para el Admin Dashboard)
    // Se ejecuta si 'requiredRole' está definido (como en la ruta /admin)
    if (requiredRole && (!user || user.role !== requiredRole)) {
        console.warn(`Acceso denegado a ruta protegida: Se requiere el rol ${requiredRole}.`);
        // Si el usuario no tiene el rol, lo redirigimos a la página principal
        return <Navigate to="/" replace />;
    }

    // 3. Si pasa todas las verificaciones, renderizamos el componente solicitado
    return element;
};