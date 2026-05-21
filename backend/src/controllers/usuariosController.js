// src/controllers/usuariosController.js
import Usuario from "../models/usuariosModel.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuarioEncontrado = await Usuario.findByCredentials(email, password);

    if (usuarioEncontrado) {
      return res.status(200).json({
        status: "success",
        data: usuarioEncontrado,
        message: "¡Bienvenido/a a TechLab Café!",
      });
    } else {
      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas. Verificá tu email y contraseña.",
      });
    }
  } catch (error) {
    console.error("Error en el login controller:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Error en el sistema de login" });
  }
};

// 🆕 NUEVO CONTROLADOR: Para procesar el registro de usuarios
export const registrarUsuario = async (req, res) => {
  try {
    const { email } = req.body;

    // Mini validación: Verificar si el email ya está registrado para no duplicar
    const lista = await Usuario.getAll();
    const existe = lista.find((u) => u.email === email);
    if (existe) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "El email ya se encuentra registrado.",
        });
    }

    const nuevoUsuario = await Usuario.create(req.body);
    return res.status(201).json({
      status: "success",
      data: nuevoUsuario,
      message: "Usuario registrado con éxito",
    });
  } catch (error) {
    console.error("Error en el registro controller:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Error al registrar el usuario" });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const listaUsuarios = await Usuario.getAll();
    return res.status(200).json({ status: "success", data: listaUsuarios });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error al obtener usuarios" });
  }
};
