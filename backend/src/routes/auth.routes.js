import { Router } from "express";
import { generateToken } from "../utils/token-generator.js";

const router = Router();

// El usuario por defecto que pide la Clase 15 para simular el Login
const DEFAULT_USER = {
  email: "admin@cafeteria.com",
  password: "admin123",
};

// Tu usuario de administradora registrado en Cloud Firestore ☕
const MY_USER = {
  email: "marce@admin.com",
  password: "tiendadecafe",
};

// POST /auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // 🔒 Validamos si coincide con el admin por defecto O con tus credenciales de la base de datos
  if (
    (email === DEFAULT_USER.email && password === DEFAULT_USER.password) ||
    (email === MY_USER.email && password === MY_USER.password)
  ) {
    // Generamos el token con el email que inició sesión y el rol de administrador
    const token = generateToken({ email: email, role: "admin" });

    // Devolvemos el token en formato Bearer como pide la consigna
    return res.status(200).json({
      message: "Autenticación exitosa",
      token: `Bearer ${token}`,
    });
  } else {
    // Si fallan las credenciales, tiramos error 401 (No autorizado) tal como exige el Trabajo Final
    return res
      .status(401)
      .json({ message: "Credenciales inválidas. Error de autenticación." });
  }
});

export default router;
