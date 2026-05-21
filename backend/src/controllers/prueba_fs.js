const controller = require("./productosController");

// --- PASO 1: Ver qué hay hoy en la cafetería ---
console.log("--- 1. Leyendo productos actuales ---");
const iniciales = controller.obtenerProductos();
console.table(iniciales.data);

// --- PASO 2: Crear un nuevo café ---
console.log("\n--- 2. Guardando un nuevo café en el archivo JSON ---");
const cafeNuevo = {
  type: "molido",
  name: "Café de Especialidad Brasil",
  price: 15.5,
  description: "Notas de caramelo y chocolate. Tostado artesanal.",
  stock: 10,
};

const resultado = controller.crearProducto(cafeNuevo);

if (resultado.status === 201) {
  console.log("✅ ¡Éxito! El café se guardó físicamente en el disco.");
  console.log("ID asignado:", resultado.data.id);
}

// --- PASO 3: Verificar la persistencia ---
console.log("\n--- 3. Lista final (leída desde el archivo) ---");
const finales = controller.obtenerProductos();
console.table(finales.data);
