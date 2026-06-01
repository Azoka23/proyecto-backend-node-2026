// src/services/Products.js
const BASE_URL = "http://localhost:3000/api/productos";

// --- 1. FUNCIÓN PARA LEER Y FILTRAR (READ) ---
// Sigue siendo de acceso público para tus clientes en la tienda, no requiere token
export const getProducts = async (categoryId = null) => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error(`No se pudo obtener la lista de productos de: ${BASE_URL}`);
  }

  const responseJson = await res.json();
  const listaProductos = responseJson.data || [];

  if (categoryId) {
    return listaProductos.filter((producto) => producto.type === categoryId);
  }

  return listaProductos;
};

// --- 2. FUNCIÓN PARA CREAR UN PRODUCTO (CREATE) ---
// 🔐 Ahora recibe el 'token' enviado desde el formulario contenedor
export const createProduct = async (product, token) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🎯 Inyectamos la credencial JWT blindada
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error(
      "No se pudo crear el producto. Verifique sus credenciales de administrador.",
    );
  }

  const result = await res.json();
  return result;
};

// --- 3. FUNCIÓN PARA ACTUALIZAR UN PRODUCTO (UPDATE) ---
// 🔐 Ahora recibe el 'token' enviado desde el formulario contenedor
export const updateProduct = async (id, updatedFields, token) => {
  const URL_WITH_ID = `${BASE_URL}/${id}`;

  const res = await fetch(URL_WITH_ID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🎯 Inyectamos la credencial JWT blindada
    },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) {
    throw new Error(`No se pudo actualizar el producto. ID: ${id}`);
  }

  const result = await res.json();
  return result;
};

// --- 4. FUNCIÓN PARA ELIMINAR UN PRODUCTO (DELETE) ---
// 🔐 También le agregamos protección para cuando uses la papelera de reciclaje en la lista
export const deleteProduct = async (id, token) => {
  const URL_WITH_ID = `${BASE_URL}/${id}`;

  const res = await fetch(URL_WITH_ID, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // 🎯 Exigimos el token para borrar
    },
  });

  if (!res.ok) {
    throw new Error(`No se pudo eliminar el producto con ID: ${id}`);
  }

  return { success: true, id };
};

// --- 5. FUNCIÓN PARA LEER UN SOLO PRODUCTO POR ID (READ ONE) ---
// Sigue siendo pública para ver el detalle de un café en la tienda
export const getProductById = async (id) => {
  const URL_WITH_ID = `${BASE_URL}/${id}`;

  const res = await fetch(URL_WITH_ID);

  if (!res.ok) {
    throw new Error(`No se pudo obtener el producto con ID: ${id}`);
  }

  const responseJson = await res.json();
  return responseJson.data ? responseJson.data : responseJson;
};
