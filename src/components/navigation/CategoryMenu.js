import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import '../../assets/styles/CategoryMenu.css'; 

const CircularIconsRow = () => {
    const { catalogId } = useParams();
    const [categoryList, setCategoryList] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost/admin-ecatalogue-v2/api/getCategory/${catalogId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Problème de connexion');
                }
                return response.json();
            })
            .then(data => setCategoryList(data))
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [catalogId]);

    return (
        <div>
            {categoryList.length > 0 ? (
                <div className="circular-icons-row">
                    {categoryList.map((category, index) => (
                        <div className="icon-container" key={category.categorie_id} height="186px">
                            <a href={category.categorie_image}>
                                <img src={category.categorie_image} alt={category.categorie_name} className="icon" />
                            </a>
                            <p className="icon-label">{category.categorie_name}</p>
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
