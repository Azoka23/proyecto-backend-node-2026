// src/adminComponents/ProductFormContainer/ProductFormContainer.jsx

import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext"; // 🔐 Importamos el contexto para un Logout limpio
import { ProductsFormUI } from "../ProductsFormUI/ProductsFormUI";
import { validateProducts } from "../../utils/validateProducts";
import { uploadToImgbb } from "../../services/uploadImage";
import { createProduct, updateProduct } from "../../services/Products";

import "./ProductFormContainer.css";

const initialProductState = {
  name: "",
  price: "",
  stock: "",
  type: "",
  description: "",
};

export const ProductFormContainer = ({ productToEdit, handleSuccess }) => {
  const initialProduct = productToEdit
    ? { ...productToEdit }
    : initialProductState;

  const isEdit = !!productToEdit;

  // 1. Estados
  const [product, setProduct] = useState(initialProduct);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Traemos el método logout nativo del contexto
  const { logout } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // 🚪 Corrección de seguridad para cerrar sesión desde el formulario
  const handleLogout = () => {
    console.log(
      "🔴 Forzando borrado estricto de credenciales desde el formulario...",
    );
    localStorage.removeItem("adminAuthToken");
    localStorage.removeItem("adminUser");
    if (logout) {
      logout();
    }
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    setErrors((prev) => ({ ...prev, imgFile: null }));
  };

  // FUNCIÓN PRINCIPAL DE ENVÍO Y LÓGICA (CREATE y UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const fileRequired = !isEdit || (!initialProduct.img && !file);
    const validationErrors = validateProducts(
      { ...product, imgFile: file },
      fileRequired,
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      // 🎯 RECUPERAMOS EL TOKEN REAL DE TU LOCALSTORAGE PARA EL BACKEND
      const token = localStorage.getItem("adminAuthToken");

      let uploadedImageUrl = initialProduct.img;

      if (file) {
        console.log("Subiendo imagen a imgbb...");
        uploadedImageUrl = await uploadToImgbb(file);
      }

      const finalProductData = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
        image: uploadedImageUrl,
      };

      let result;

      // 🔐 Enviamos el 'token' como un parámetro extra a los servicios para que no se tilden
      if (isEdit) {
        result = await updateProduct(product.id, finalProductData, token);
        alert(`¡Producto ${product.name} actualizado con éxito!`);
      } else {
        result = await createProduct(finalProductData, token);
        alert(`¡Producto creado con éxito!`);
        setProduct(initialProductState);
      }

      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (handleSuccess) {
        handleSuccess(result);
      }
    } catch (error) {
      console.error(
        `Error en la operación ${isEdit ? "UPDATE" : "CREATE"}:`,
        error.message,
      );
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
        isEdit={isEdit}
        onChange={handleChange}
        onFileChange={onFileChange}
        onSubmit={handleSubmit}
        fileInputRef={fileInputRef}
      />

      {/* Botones flotantes */}
      <div className="floating-buttons">
        <button
          className="floating-btn back-btn"
          onClick={() => window.history.back()}
        >
          🔙 Volver
        </button>
        <button className="floating-btn logout-btn" onClick={handleLogout}>
          🚪 Cerrar sesión
        </button>
      </div>
    </div>
  );
};
