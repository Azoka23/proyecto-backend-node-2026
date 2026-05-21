// src/utils/ValidateProducts.js

export const validateProducts = (product, fileRequired = true) => {
    
    const errors = {}; // Objeto para almacenar los errores

    // --- 1. VALIDACIÓN DEL NOMBRE ---
    if (!product.name || product.name.trim() === "") {
        errors.name = "El nombre del producto es obligatorio.";
    }

    // --- 2. VALIDACIÓN DEL PRECIO ---
    const price = Number(product.price);
    if (!product.price || isNaN(price) || price <= 0) {
        errors.price = "El precio debe ser un número mayor a cero.";
    }

    // --- 3. VALIDACIÓN DEL STOCK ---
    const stock = Number(product.stock);
    if (product.stock === null || product.stock === undefined || isNaN(stock) || stock < 0) {
        errors.stock = "El stock debe ser un número igual o mayor a cero.";
    }

    // --- 4. VALIDACIÓN DE LA CATEGORÍA (Ella lo llama 'category', nosotros 'type' para ser consistentes con el state) ---
    // Usaremos la validación de que no esté vacío, ya que el select lo restringe.
    if (!product.type || product.type.trim() === "") {
         errors.type = "Debes seleccionar una categoría.";
    }

    // --- 5. VALIDACIÓN DE LA IMAGEN (CRÍTICO - De acuerdo al código de la profesora) ---
    // Chequeamos si se requiere un archivo (para creación) y si no se ha seleccionado ninguno.
    if (fileRequired && !product.file && !product.img) {
        // En tu ProductFormContainer le pasas el archivo dentro de product como product.imgFile:
        if (!product.imgFile) {
            errors.imgFile = "Debes seleccionar una imagen.";
        }
    }

if (!product.description || product.description.trim() === "") {
        errors.description = "La descripción del producto es obligatoria.";
    }
    return errors;
};