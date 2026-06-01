import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  // Buscamos el encabezado de autorización (Authorization Header)
  const authHeader = req.headers["authorization"];

  // El token suele venir como "Bearer TOKEN_ACA", así que separamos el string por el espacio y agarramos el token limpio
  const token = authHeader && authHeader.split(" ")[1];

  // Si el cliente no mandó ningún token, tiramos error 401 (No autorizado)
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No se proporcionó un token." });
  }

  // Si hay token, verificamos que sea válido usando nuestra clave secreta del .env
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // Si el token expiró o es falso, tiramos error 403 (Prohibido)
    if (err) {
      // 🚨 AGREGAMOS ESTOS LOGS PARA VER EL ERROR EN LA TERMINAL DEL BACKEND
      console.log("❌ ERROR EN EL MIDDLEWARE DE AUTENTICACIÓN:");
      console.log("Detalle del error:", err.message);
      console.log(
        "Token recibido en el Back:",
        token ? "Sí (comienza con " + token.substring(0, 10) + "...)" : "No",
      );

      return res.status(403).json({ message: "Token inválido o expirado." });
    }

    // Si todo está perfecto, guardamos los datos del usuario en la petición para que el controlador los use
    req.user = user;

    // ¡Next! Le damos luz verde para que continúe al controlador
    next();
  });
};
