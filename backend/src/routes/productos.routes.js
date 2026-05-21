// src/routes/productos.routes.js
import express from "express";
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

// 1. Obtener todos los productos (GET)
router.get("/productos", obtenerProductos);

// 2. Obtener un producto específico por ID (GET) - Clase 11
router.get("/productos/:id", obtenerProductoPorId);

// 3. Agregar un nuevo producto (POST)
router.post("/productos", crearProducto);

// 4. Editar un producto por su ID (PUT) - Clase 11: Path Params
router.put("/productos/:id", editarProducto);

// 5. Eliminar un producto por su ID (DELETE)
router.delete("/productos/:id", eliminarProducto);

export default router;
