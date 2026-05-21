// src/models/ventasModel.js

// Importamos la conexión centralizada a Firebase que ya tenías armada
import db from "../config/db.js";

class Venta {
  // Usamos un método estático y asíncrono para interactuar con la nube
  static async create(datosVenta) {
    try {
      // Creamos la estructura limpia del ticket de venta
      const nuevaVenta = {
        fecha: new Date().toLocaleString(),
        cliente: datosVenta.cliente || "Anónimo",
        productos: datosVenta.carrito || [], // Aquí se guardará el array que mande React
        total: datosVenta.total || 0,
        estado: "generada", // Estado por defecto para la orden
      };

      // Guardamos la venta en una nueva colección llamada "ventas" en Firestore
      // .add() le indica a Firebase que genere un ID único automáticamente
      const docRef = await db.collection("ventas").add(nuevaVenta);

      // Retornamos el objeto completo incluyendo el ID real que nos dio Firebase
      return { idVenta: docRef.id, ...nuevaVenta };
    } catch (error) {
      console.error("Error en modelo al guardar la venta en Firebase:", error);
      throw error;
    }
  }
}

export default Venta;
