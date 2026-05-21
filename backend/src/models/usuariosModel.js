// src/models/usuariosModel.js
import db from "../config/db.js";

class Usuario {
  static async findByCredentials(email, password) {
    try {
      const resp = await db
        .collection("usuarios")
        .where("email", "==", email)
        .where("password", "==", password)
        .get();

      if (resp.empty) return null;

      const doc = resp.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error("Error al buscar usuario en Firebase:", error);
      throw error;
    }
  }

  // 🆕 NUEVO MÉTODO: Para guardar usuarios nuevos desde el Registro
  static async create(datosUsuario) {
    try {
      const nuevoUsuario = {
        nombre: datosUsuario.nombre,
        email: datosUsuario.email,
        password: datosUsuario.password, // En producción se encripta, acá lo dejamos simple para la entrega
        rol: datosUsuario.rol || "cliente", // Por defecto siempre entran como clientes comunes
      };

      // Guardamos en Firestore
      const docRef = await db.collection("usuarios").add(nuevoUsuario);
      return { id: docRef.id, ...nuevoUsuario };
    } catch (error) {
      console.error("Error al crear usuario en Firebase:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      const resp = await db.collection("usuarios").get();
      return resp.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error al traer usuarios de Firebase:", error);
      throw error;
    }
  }
}

export default Usuario;
