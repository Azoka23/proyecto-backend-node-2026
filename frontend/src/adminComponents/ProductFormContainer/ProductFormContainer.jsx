// src/adminComponents/ProductFormContainer/ProductFormContainer.jsx

import React, { useState, useRef } from 'react';
import { ProductsFormUI } from '../ProductsFormUI/ProductsFormUI';
import { validateProducts } from '../../utils/validateProducts';
import { uploadToImgbb } from '../../services/uploadImage'; 
import { createProduct, updateProduct } from '../../services/Products'; // <-- Importamos updateProduct

import './ProductFormContainer.css';

// Estado inicial para un nuevo producto
const initialProductState = {
    name: '',
    price: '',
    stock: '',
    type: '', 
    description: '', 
};

// Recibimos 'productToEdit' (para la edición) y 'handleSuccess' (para notificar al Dashboard)
export const ProductFormContainer = ({ productToEdit, handleSuccess }) => {
    
    // Si estamos editando, usamos los datos existentes; si no, el estado inicial
    const initialProduct = productToEdit 
        ? { ...productToEdit } // Copia los datos para evitar mutación directa
        : initialProductState;
        
    const isEdit = !!productToEdit; // Bandera para saber si es edición
    
    // 1. Estados
    const [product, setProduct] = useState(initialProduct); 
    // Si estamos editando, la imagen ya existe, no hay 'file' seleccionado aún.
    const [file, setFile] = useState(null); 
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
const fileInputRef = useRef(null);

    // ... (Tu handleChange y onFileChange son perfectos, no necesitan cambios) ...
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleLogout = () => {
    console.log("Cerrando sesión...");
    window.location.href = "/";
};


    const onFileChange = (e) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        setFile(selectedFile); 
        setErrors(prev => ({ ...prev, imgFile: null }));
    };


    // FUNCIÓN PRINCIPAL DE ENVÍO Y LÓGICA (Funciona para CREATE y UPDATE)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        // 🛑 Lógica Clave: Determinar si la imagen es OBLIGATORIA
        // Es OBLIGATORIA si:
        // 1. Estamos CREANDO (isEdit es false)
        // 2. Estamos EDITANDO Y el producto NO tiene imagen (product.img) Y NO se seleccionó una nueva (file)
        const fileRequired = !isEdit || (!initialProduct.img && !file);

        // 1. Validar: Pasamos la data y el archivo, y la flag de si es requerido
        const validationErrors = validateProducts({ ...product, imgFile: file }, fileRequired);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            let uploadedImageUrl = initialProduct.img; // Si editamos, usamos la URL existente por defecto
            
            // 2. Subir la imagen SÓLO si se seleccionó un nuevo archivo
            if (file) {
                console.log("Subiendo imagen a imgbb...");
                uploadedImageUrl = await uploadToImgbb(file);
            }
            
            // 3. Preparar la data final (la imagen a la DB es la URL)
            const finalProductData = {
                ...product,
                price: Number(product.price),
                stock: Number(product.stock),
                image: uploadedImageUrl, 
            };
            
            let result;
            
            // 4. Ejecutar la operación CRUD
            if (isEdit) {
                // UPDATE: Llamamos a updateProduct con el ID del producto
                result = await updateProduct(product.id, finalProductData); 
                alert(`Producto ${product.name} actualizado con éxito!`);
            } else {
                // CREATE: Llamamos a createProduct
                result = await createProduct(finalProductData); 
                alert(`Producto creado con éxito!`);
                // Limpiar formulario al crear
                setProduct(initialProductState);
            }
            
            setFile(null); // Limpiar el estado del archivo
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Resetea el valor visual del input file
            }

            // 5. Notificar al componente padre (Dashboard)
            if (handleSuccess) {
                handleSuccess(result); 
            }
            
        } catch (error) {
            console.error(`Error en la operación ${isEdit ? 'UPDATE' : 'CREATE'}:`, error.message);
            alert(`Error al guardar el producto: ${error.message}`);
            
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="product-form-container">
            <ProductsFormUI 
                product={product}
                errors={errors}
                loading={loading}
                isEdit={isEdit} // Enviamos la bandera de edición
                onChange={handleChange} // <-- Si quieres usar onChange como en el UI
                onFileChange={onFileChange} 
                onSubmit={handleSubmit} // <-- Si quieres usar onSubmit como en el UI
                fileInputRef={fileInputRef}
            />

            {/* Botones flotantes */}
      <div className="floating-buttons">
        <button className="floating-btn back-btn" onClick={() => window.history.back()}>
          🔙 Volver
        </button>
        <button className="floating-btn logout-btn" onClick={handleLogout}>
          🚪 Cerrar sesión
        </button>
      </div>
        </div>
    );
};