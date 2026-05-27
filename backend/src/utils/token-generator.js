import jwt from "jsonwebtoken";

// Esta función recibe los datos del usuario y genera el token firmado
export const generateToken = (payload) => {
  // Tomamos la clave secreta que guardamos recién en el archivo .env
  const secretKey = process.env.JWT_SECRET_KEY;

  // Firmamos el token y hacemos que venza en 1 hora por seguridad
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};
