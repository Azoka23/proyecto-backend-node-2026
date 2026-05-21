// src/routes/usuarios.routes.js
import express from "express";
const router = express.Router();

import {
  login,
  registrarUsuario,
  obtenerUsuarios,
} from "../controllers/usuariosController.js";

// Ruta para Login (POST)
router.post("/usuarios/login", login);

// Ruta para Registro (POST)
router.post("/usuarios/registro", registrarUsuario);

// Ruta para ver todos (GET) - Opcional
router.get("/usuarios", obtenerUsuarios);

export default router;
