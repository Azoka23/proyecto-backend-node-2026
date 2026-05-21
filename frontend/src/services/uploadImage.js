// Esta funcion la hacemos para solucionar el problema de mockAPI que no permite
// subir imagenes: subimos imagenes a imgbb y devuelve una URL publica.
// Luego esa URL la usamos para mockAPI 😉
//
// ⚠️ Importante: esta clave queda expuesta en el cliente.
//     Para prácticas esta ok, pero no es ideal para ambientes reales.

const IMGBB_API_KEY = "5f813343924950391a70bf11d7e51933"; //👈reemplazan por la suya
const ENDPOINT = "https://api.imgbb.com/1/upload";

// Funcion con la que vamos a convertir la imagen (File) a cadena base64
// Base64 es una codificacion de texto que representa datos binarios (la imagen)
// El navegador genera un Data URL del estilo:
//    "data:image/png;base64,AAAA...."
// Para imgbb, hay que enviar **solo la parte base64** (sin el prefijo "data:...").

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // reader.result viene como "data:image/png;base64,AAAA..."
      const result = String(reader.result);
      const parts = result.split(",");

      if (parts.length < 2) {
        reject(new Error("Formato de Data URL inválido"));
        return;
      }

      const base64 = parts[1]; // sacamos el prefijo "data:...;base64,"
      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("No se pudo leer el archivo"));
    };

    reader.readAsDataURL(file);
  });
};

export const uploadToImgbb = async (file) => {
  // Validaciones mínimas
  if (!file) {
    throw new Error("No se recibió ningún archivo de imagen");
  }

  const form = new FormData();
  form.append("key", IMGBB_API_KEY);

  // Convertimos el archivo a base64 antes de enviarlo
  const base64 = await fileToBase64(file);
  form.append("image", base64);

  // Llamada a la API con fetch para la carga de la imagen (POST)
  const response = await fetch(ENDPOINT, {
    method: "POST",
    body: form,
  });

  // Parseamos la respuesta como JSON
  let json;
  try {
    json = await response.json();
  } catch {
    throw new Error("La respuesta del servidor no es JSON válido");
  }

  // Manejo de errores de red o del propio API
  if (!response.ok || (json && json.success === false)) {
    const message =
      (json && json.error && json.error.message) || "Error al subir la imagen";
    throw new Error(message);
  }

  // imgbb devuelve varias URLs posibles
  // - url: original
  // - display_url: via su CDN (la mas usada para mostrar)
  if (json && json.data) {
    if (json.data.display_url) {
      return json.data.display_url;
    }

    if (json.data.url) {
      return json.data.url;
    }
  }

  // Si llegamos acá, no recibimos los campos esperados
  throw new Error("No se recibió una URL válida desde imgbb");
};