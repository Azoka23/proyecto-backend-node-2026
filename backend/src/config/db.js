import admin from "firebase-admin";
import { createRequire } from "module";
import path from "path"; // Importamos path para localizar el archivo con precisión

const require = createRequire(import.meta.url);

// process.cwd() nos da la carpeta raíz del proyecto (donde está el package.json)
const rutaLlave = path.join(process.cwd(), "firebase-key.json");

const serviceAccount = require(rutaLlave);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

console.log("✅ Conexión con Firebase Firestore exitosa");

export default db;
