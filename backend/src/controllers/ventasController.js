// src/controllers/ventasController.js
import Venta from "../models/ventasModel.js"; // Importamos el modelo que habla con Firebase

export const registrarVenta = async (req, res) => {
  try {
    // req.body son los "datosVenta" que llegan desde el React
    const datosVenta = req.body;

    // Pasamos los datos al modelo de Firebase (reemplaza tu fs.writeFileSync)
    const nuevaVenta = await Venta.create(datosVenta);

    // Mandamos la respuesta a React (igual que tu return original, pero usando res.status)
    return res.status(201).json({
      status: "success",
      data: nuevaVenta,
      message: "Venta registrada con éxito en Firebase",
    });
  } catch (error) {
    console.error("Error al procesar la venta:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al procesar la venta en el servidor",
    });
  }
};
