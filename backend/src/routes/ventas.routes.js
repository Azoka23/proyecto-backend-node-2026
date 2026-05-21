// src/routes/ventas.routes.js
import express from "express";
const router = express.Router();

// Importamos la función del controlador de ventas
import { registrarVenta } from "../controllers/ventasController.js";

/**
 * RUTAS DE VENTAS (CHECKOUT)
 * El prefijo "/api" ya viene definido desde el index.js
 */

// 1. Registrar una nueva venta/orden (POST)
router.post("/ventas", registrarVenta);

export default router;
