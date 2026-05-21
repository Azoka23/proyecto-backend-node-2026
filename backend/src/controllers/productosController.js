/* =========================================================================
   CÓDIGO ANTERIOR (CLASE 13 - USANDO MÉTODOS SÍNCRONOS)
   Este código funcionaba de forma instantánea con el archivo productos.json
=========================================================================

import Producto from "../models/productosModel.js";

export const obtenerProductos = (req, res) => {
  try {
    const productos = Producto.getAll(); 
    res.status(200).json({ status: "success", data: productos });
  } catch (error) {
    res.status(500).json({ status: "error", mensaje: "Error al obtener productos" });
  }
};

export const obtenerProductoPorId = (req, res) => {
  try {
    const producto = Producto.getById(req.params.id);
    if (!producto) {
      return res.status(404).json({ status: "error", mensaje: "Producto no encontrado" });
    }
    res.status(200).json({ status: "success", data: producto });
  } catch (error) {
    res.status(500).json({ status: "error", mensaje: "Error al buscar el producto" });
  }
};

export const crearProducto = (req, res) => {
  try {
    const nuevoProducto = Producto.create(req.body);
    res.status(201).json({ status: "success", data: nuevoProducto });
  } catch (error) {
    res.status(500).json({ status: "error", mensaje: "Error al crear el producto" });
  }
};

export const editarProducto = (req, res) => {
  try {
    const actualizado = Producto.update(req.params.id, req.body);
    if (!actualizado) {
      return res.status(404).json({ status: "error", mensaje: "Producto no encontrado" });
    }
    res.status(200).json({ status: "success", data: actualizado });
  } catch (error) {
    res.status(500).json({ status: "error", mensaje: "Error al editar el producto" });
  }
};

export const eliminarProducto = (req, res) => {
  try {
    const eliminado = Producto.delete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ status: "error", mensaje: "Producto no encontrado" });
    }
    res.status(200).json({ status: "success", mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ status: "error", mensaje: "Error al eliminar el producto" });
  }
};
*/

// =========================================================================
//   NUEVO CÓDIGO (CLASE 14 - USANDO ASYNC / AWAIT PARA FIREBASE)
//   Necesario porque pedir datos a la nube no es instantáneo.
// =========================================================================

import Producto from "../models/productosModel.js";

// 1. GET: Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.getAll();
    res.status(200).json({ status: "success", data: productos });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", mensaje: "Error al obtener productos" });
  }
};

// 2. GET: Obtener UN solo producto por ID
export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.getById(req.params.id);
    if (!producto) {
      return res
        .status(404)
        .json({ status: "error", mensaje: "Producto no encontrado" });
    }
    res.status(200).json({ status: "success", data: producto });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", mensaje: "Error al buscar el producto" });
  }
};

// 3. POST: Crear un nuevo producto
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json({ status: "success", data: nuevoProducto });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", mensaje: "Error al crear el producto" });
  }
};

// 4. PUT: Editar un producto
export const editarProducto = async (req, res) => {
  try {
    const actualizado = await Producto.update(req.params.id, req.body);
    if (!actualizado) {
      return res
        .status(404)
        .json({ status: "error", mensaje: "Producto no encontrado" });
    }
    res.status(200).json({ status: "success", data: actualizado });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", mensaje: "Error al editar el producto" });
  }
};

// 5. DELETE: Eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Producto.delete(req.params.id);
    if (!eliminado) {
      return res
        .status(404)
        .json({ status: "error", mensaje: "Producto no encontrado" });
    }
    res.status(200).json({ status: "success", mensaje: "Producto eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", mensaje: "Error al eliminar el producto" });
  }
};
