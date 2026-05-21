const userController = require("./usuariosController");

// PRUEBA 1: Login Exitoso
console.log("🔐 Intentando login con Marcela...");
const intento1 = userController.login("marcela@cafe.com", "admin123");
console.log(
  "Resultado:",
  intento1.message,
  "| Rol:",
  intento1.data ? intento1.data.rol : "N/A",
);

// PRUEBA 2: Login Fallido
console.log("\n🔐 Intentando login con contraseña incorrecta...");
const intento2 = userController.login("marcela@cafe.com", "contraseña_mal");
console.log("Resultado:", intento2.message);
