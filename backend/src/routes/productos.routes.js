// src/routes/productos.routes.js
import express from "express";
import { authenticateToken } from "../middlewares/authentication.js";
const router = express.Router();

// Importamos todas las funciones del controlador
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  editarProducto,
  eliminarProducto,
} from "../controllers/productosController.js";

/**
 * RUTAS DE PRODUCTOS
 * El prefijo "/api" ya viene definido desde el index.js
 */

// 1. Obtener todos los productos (GET) - PÚBLICO
router.get("/productos", obtenerProductos);

// 2. Obtener un producto específico por ID (GET) - PÚBLICO
router.get("/productos/:id", obtenerProductoPorId);

// 3. Agregar un nuevo producto (POST) - PROTEGIDO 🔒
router.post("/productos", authenticateToken, crearProducto);

// 4. Editar un producto por su ID (PUT) - PROTEGIDO 🔒
router.put("/productos/:id", authenticateToken, editarProducto);

// 5. Eliminar un producto por su ID (DELETE) - PROTEGIDO 🔒
router.delete("/productos/:id", authenticateToken, eliminarProducto);

export default router;
