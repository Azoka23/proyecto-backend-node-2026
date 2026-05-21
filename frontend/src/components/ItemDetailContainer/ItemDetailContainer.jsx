// src/components/ItemDetailContainer/ItemDetailContainer.jsx

// src/components/ItemDetailContainer/ItemDetailContainer.jsx

import React, { useState, useEffect } from 'react';
import { ItemDetail } from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
// 🛑 Importar la nueva función de servicio (asumiendo que la agregaste en Products.js)
import { getProductById } from '../../services/Products'; 

export const ItemDetailContainer = () => { 
    
    // Obtener el ID de la URL
    const { id } = useParams(); 

    // Estado del Producto
    const [itemDetail, setItemDetail] = useState(null);
    // [Opcional] Puedes añadir estados de carga y error si quieres
    const [isLoading, setIsLoading] = useState(true); 
    
    const itemId = id; 
    
    // Efecto para la carga de datos
    useEffect(() => {
        setIsLoading(true);
        setItemDetail(null); // Limpiar el detalle al cambiar de ID
        
        // 🛑 Lógica Nueva: Llamar al servicio por ID
        getProductById(itemId) 
            .then(product => {
                // MockAPI ya devolvió el producto si existe.
                setItemDetail(product);
            })
            .catch(err => {
                // Manejo de errores si el producto no existe o falla el fetch
                console.error(`Error al cargar detalle del producto ${itemId}:`, err);
                // Si falla (ej: 404), itemDetail se mantendrá en null
            })
            .finally(() => {
                setIsLoading(false);
            });
            
    }, [itemId]); 


    
    return (
        <section className="item-detail-container">
            
            
            {/* 🛑 Manejo de los estados de carga */}
            {isLoading && <h2>Cargando detalle del producto...</h2>}
            
            {/* Mostrar detalle si el producto existe y no está cargando */}
            {!isLoading && itemDetail ? (
                
                <ItemDetail 
                    {...itemDetail} 
                     
                />
            ) : (
                // Mostrar un mensaje si no está cargando y no se encontró el producto
                !isLoading && <h2>Producto no encontrado o error al cargar.</h2>
            )}
        </section>
    );
};