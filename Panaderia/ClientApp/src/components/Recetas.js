import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Recetas = () => {
    const [recetas, setRecetas] = useState([]);
    const [detallesRecetas, setDetallesRecetas] = useState([]);
    const [selectedRecetaId, setSelectedRecetaId] = useState(null);

    useEffect(() => {
        const fetchRecetas = async () => {
            try {
                const response = await axios.get('https://localhost:7089/api/recetas');
                setRecetas(response.data);
            } catch (error) {
                console.error('Error fetching recetas:', error);
            }
        };

        fetchRecetas();
    }, []);

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`https://localhost:7089/api/recetas/${id}/detalles_recetas`);
            setDetallesRecetas(response.data);
            setSelectedRecetaId(id);
        } catch (error) {
            console.error(`Error fetching detalles_recetas for receta ${id}:`, error);
        }
    };

    return (
        <div>
            <h1>Recetas</h1>
            <ul>
                {recetas.map((receta) => (
                    <li key={receta.id_receta} onClick={() => handleClick(receta.id_receta)}>
                        {receta.str_receta}
                    </li>
                ))}
            </ul>
            {selectedRecetaId && (
                <div>
                    <h2>Detalles de la receta seleccionada:</h2>
                    <ul>
                        {detallesRecetas.map((detalleReceta) => (
                            <li key={detalleReceta.id}>
                                {detalleReceta.Ingredientes.str_nombre_ingrediente} - {detalleReceta.fl_cantidad}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
