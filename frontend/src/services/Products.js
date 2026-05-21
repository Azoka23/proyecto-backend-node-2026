// src/services/Products.js
const BASE_URL = "http://localhost:3000/api/productos";

// --- 1. FUNCIÓN PARA LEER Y FILTRAR (READ) ---
export const getProducts = async (categoryId = null) => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error(`No se pudo obtener la lista de productos de: ${BASE_URL}`);
  }

  const responseJson = await res.json();

  // Accedemos a .data porque tu servidor de Node lo manda así
  const listaProductos = responseJson.data || [];

  // Filtramos por categoría si existe
  if (categoryId) {
    return listaProductos.filter((producto) => producto.type === categoryId);
  }

  return listaProductos;
};

// --- 2. FUNCIÓN PARA CREAR UN PRODUCTO (CREATE) ---
export const createProduct = async (product) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el producto.");
  }

  const result = await res.json();
  return result;
};

// --- 3. FUNCIÓN PARA ACTUALIZAR UN PRODUCTO (UPDATE) ---
export const updateProduct = async (id, updatedFields) => {
  const URL_WITH_ID = `${BASE_URL}/${id}`;

  const res = await fetch(URL_WITH_ID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) {
    throw new Error(`No se pudo actualizar el producto con ID: ${id}`);
  }

  const result = await res.json();
  return result;
};

// --- 4. FUNCIÓN PARA ELIMINAR UN PRODUCTO (DELETE) ---
export const deleteProduct = async (id) => {
  const URL_WITH_ID = `${BASE_URL}/${id}`;

  const res = await fetch(URL_WITH_ID, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`No se pudo eliminar el producto con ID: ${id}`);
  }

  return { success: true, id };
};

// --- 5. FUNCIÓN PARA LEER UN SOLO PRODUCTO POR ID (READ ONE) ---
export const getProductById = async (id) => {
  const URL_WITH_ID = `${BASE_URL}/${id}`;

  const res = await fetch(URL_WITH_ID);

  if (!res.ok) {
    throw new Error(`No se pudo obtener el producto con ID: ${id}`);
  }

  const responseJson = await res.json();

  // Si el servidor devuelve {status: "success", data: {...}} sacamos el data
  return responseJson.data ? responseJson.data : responseJson;
};
