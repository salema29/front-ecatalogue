import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import '../assets/styles/CategoryNavigation.css'; 

const CircularIconsRow = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`http://localhost/admin-ecatalogue-v2/api/getCategory/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Problème de connexion');
                }
                return response.json();
            })
            .then(fetchedData => setCategories(fetchedData))
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    return (
        <div>
            {categories.length > 0 ? (
                <div className="circular-icons-row">
                    {categories.map((item, index) => (
                        <div className="icon-container" key={item.categorie_id}>
                            <a href={item.categorie_image}>
                                <img src={item.categorie_image} alt={item.categorie_name} className="icon" />
                            </a>
                            <p className="icon-label">{item.categorie_name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p> Il n'y a pas de catégorie disponible </p>
            )}
        </div>
    );
};


export default CircularIconsRow;
