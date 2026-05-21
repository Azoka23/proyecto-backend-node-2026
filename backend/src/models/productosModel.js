/* =========================================================================
   CÓDIGO ANTERIOR (CLASE 13 - USANDO JSON LOCAL) 
   Este código se usaba para leer y escribir en el archivo productos.json
=========================================================================

import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;
const rutaArchivo = path.join(__dirname, "../data/productos.json");

class Producto {
  static leerArchivo() {
    const contenido = fs.readFileSync(rutaArchivo, "utf-8");
    return JSON.parse(contenido);
  }

  static escribirArchivo(datos) {
    fs.writeFileSync(rutaArchivo, JSON.stringify(datos, null, 2));
  }

  static getAll() {
    return this.leerArchivo();
  }

  static getById(id) {
    const productos = this.leerArchivo();
    return productos.find((p) => p.id == id);
  }

  static create(datos) {
    const productos = this.leerArchivo();
    const nuevo = { id: Date.now().toString(), ...datos };
    productos.push(nuevo);
    this.escribirArchivo(productos);
    return nuevo;
  }

  static update(id, datosNuevos) {
    const productos = this.leerArchivo();
    const indice = productos.findIndex((p) => p.id == id);
    if (indice === -1) return null;
    productos[indice] = { ...productos[indice], ...datosNuevos };
    this.escribirArchivo(productos);
    return productos[indice];
  }

  static delete(id) {
    const productos = this.leerArchivo();
    const nuevaLista = productos.filter((p) => p.id != id);
    if (productos.length === nuevaLista.length) return false;
    this.escribirArchivo(nuevaLista);
    return true;
  }
}
*/

// =========================================================================
//   NUEVO CÓDIGO (CLASE 14 - USANDO FIREBASE FIRESTORE)
//   Ahora los datos viven en la nube de Google.
// =========================================================================

import db from "../config/db.js"; // Importamos la conexión a Firebase

class Producto {
  // Ahora todos los métodos son ASYNC porque viajar a la nube toma tiempo

  static async getAll() {
    try {
      const resp = await db.collection("productos").get();
      // Mapeamos los documentos de Firebase para que se vean como objetos JS normales
      const productos = resp.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return productos;
    } catch (error) {
      console.error("Error al obtener productos de Firebase:", error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const doc = await db.collection("productos").doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error("Error al obtener producto por ID:", error);
      throw error;
    }
  }

  static async create(datos) {
    try {
      // Firebase genera el ID automático al usar .add()
      const docRef = await db.collection("productos").add(datos);
      return { id: docRef.id, ...datos };
    } catch (error) {
      console.error("Error al crear producto en Firebase:", error);
      throw error;
    }
  }

  static async update(id, datosNuevos) {
    try {
      await db.collection("productos").doc(id).update(datosNuevos);
      return { id, ...datosNuevos };
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      return null;
    }
  }

  static async delete(id) {
    try {
      await db.collection("productos").doc(id).delete();
      return true;
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return false;
    }
  }
}

export default Producto;
