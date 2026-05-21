// =========================================================================
//   ETAPA 1: LÓGICA CON FILE SYSTEM (FS) Y CONTROLADORES LOCALES
//   (Código comentado para referencia)
// =========================================================================
/* const path = require("path");
const productosController = require("./controllers/productosController");
... (lo mantenemos igual)
*/

// =========================================================================
//   ETAPA 2: PRE-ENTREGA TECHLAB - FAKESTORE API (ESM)
//   (Mantenemos el código pero comentamos la ejecución automática)
// =========================================================================
const API_URL = "https://fakestoreapi.com";
const ejecutarSistema = async () => {
  /* ... tu lógica de fetch ... */
};
// ejecutarSistema(); // Comentado para que no interfiera con el servidor

// =========================================================================
//   ETAPA 3: SERVIDOR WEB CON EXPRESS + ARQUITECTURA CLASE 10
//   Aquí ajustamos para usar TUS RUTAS, TU CONTROLADOR E IMÁGENES
// =========================================================================

import express from "express";
import path from "path";
import cors from "cors"; // ✅ IMPORTADO PARA LA CONEXIÓN CON REACT
import rutasProductos from "./routes/productos.routes.js";
import rutasVentas from "./routes/ventas.routes.js";
import rutasUsuarios from "./routes/usuarios.routes.js";

const app = express();
const PORT = 3000;

// --- MIDDLEWARES ---

// ✅ PERMISO CORS: Permite que React (puerto 5173) pida datos a Node (puerto 3000)
app.use(cors());

// Permite que el servidor entienda JSON en el cuerpo de las peticiones (POST/PUT)
app.use(express.json());

// CONFIGURACIÓN DE ARCHIVOS ESTÁTICOS (IMÁGENES)
app.use(express.static(path.join(process.cwd(), "public")));

// --- CONEXIÓN DE TUS RUTAS ---

// Usamos el prefijo /api para tus productos locales (los de Firebase)
app.use("/api", rutasProductos);
app.use("/api", rutasVentas);
app.use("/api", rutasUsuarios);
// Mantengo tu ruta de productos de la Etapa 2 (Fakestore) por si querés comparar
app.get("/productos-externos", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error al conectar con la API externa");
  }
});

// Ruta Ping
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Middleware para manejar rutas inexistentes (Clase 11)
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    mensaje: "Lo sentimos, la ruta que buscas no existe.",
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 SERVIDOR TECHLAB ACTIVO: http://localhost:${PORT}`);
  console.log(`☕ Imágenes: http://localhost:${PORT}/images/cafe1.jpg`);
  console.log(
    `📂 Productos locales (Firebase): http://localhost:${PORT}/api/productos`,
  );
  console.log(
    `🌐 Productos externos: http://localhost:${PORT}/productos-externos`,
  );
});
