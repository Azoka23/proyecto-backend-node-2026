import React from 'react';

// Si no tienes las categorías definidas en otro sitio, las ponemos aquí:
const PRODUCT_TYPES = ["Grano", "Capsula", "Soluble", "Otros"];

export const ProductsFormUI = ({
    product,
    errors,
    loading,
    isEdit,
    // Renombramos la prop a 'onChange' para coincidir con la captura
    onChange, 
    onFileChange,
    onSubmit, // Prop para el envío del formulario
    fileInputRef,
}) => {

    return (
        <section className="product-form-section">
            <h2 className="form-title">
                {isEdit ? "Editar Producto" : "Agregar Nuevo Producto"}
            </h2>
            
            <form className="product-form" onSubmit={onSubmit}> 
                
                {/* --- 1. NOMBRE --- */}
                <div> 
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={product.name || ''}
                        onChange={onChange} // <--- Usamos onChange
                        required
                        disabled={loading}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                {/* --- 2. PRECIO --- */}
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={product.price || ''}
                        onChange={onChange}
                        required
                        disabled={loading}
                    />
                    {errors.price && <p className="error-message">{errors.price}</p>}
                </div>

                {/* --- 3. STOCK --- */}
                <div>
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        id="stock"
                        value={product.stock || ''}
                        onChange={onChange}
                        required
                        disabled={loading}
                    />
                    {errors.stock && <p className="error-message">{errors.stock}</p>}
                </div>


                <div>
            <label htmlFor="description">Descripción:</label>
            <textarea
                name="description"
                id="description"
                value={product.description || ''}
                onChange={onChange}
                required
                disabled={loading}
            />
            {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

                {/* --- 4. CATEGORÍA (TYPE) --- */}
                <div>
                    <label htmlFor="type">Categoría:</label>
                    <select
                        name="type"
                        id="type"
                        value={product.type || ''}
                        onChange={onChange}
                        required
                        disabled={loading}
                    >
                        <option value="">Seleccione una categoría</option>
                        {PRODUCT_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.type && <p className="error-message">{errors.type}</p>}
                </div>
                
                {/* --- 5. IMAGEN --- */}
                <div>
                    <label htmlFor="imgFile">Imagen:</label>
                    <input
                        type="file"
                        name="imgFile"
                        id="imgFile"
                        accept="image/*"
                        onChange={onFileChange} 
                        disabled={loading}
                        ref={fileInputRef}
                    />
                    {errors.imgFile && <p className="error-message">{errors.imgFile}</p>}
                </div>

                {/* --- BOTÓN DE ENVÍO --- */}
                <button 
                    type="submit" 
                    className="submit-button" 
                    disabled={loading}
                >
                    {loading ? "Procesando..." : (isEdit ? "Guardar Cambios" : "Crear Producto")}
                </button>

            </form>
        </section>
    );
};