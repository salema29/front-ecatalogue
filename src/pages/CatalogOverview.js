import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Catalog() {
  const { catalogId } = useParams();
  const [headerData, setHeaderData] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/`);
  };

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
const firstCategorieId = categoryList[0]?.categorie_id;  // for the preselected category

const handleProductView = () => {
    navigate(`/products-resume/${catalogId}/${firstCategorieId}`);
};

  useEffect(() => {
    fetch(`http://localhost/admin-ecatalogue-v2/api/getOneSlide/${catalogId}`)
      .then((response) => response.json())
      .then((fetchedData) => setHeaderData(fetchedData))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [catalogId]);

  return (
    <>
      {headerData ? (
        <>
          <header className="header">
            <div className="view-format-dialog-left-part">
              <img
                className="header-logo"
                src={headerData.client_logo}
                alt=""
              />
              <div className="header-text">
                <p style={{ color: headerData ? headerData.client_color : "#fff" }} >
                  {headerData.catalogue_name_ln_un}{" "}
                  {headerData.catalogue_name_ln_deux}
                </p>
                <p>
                  du {headerData.catalogue_date_validite_debut} auuy{" "}
                  {headerData.catalogue_date_validite_fin}
                </p>
              </div>
            </div>
            <div className="view-format-dialog-right-part">
              <button
                className="view-format-switcher btn"
                onClick={handleProductView}
              >
                <span style={{
                  height: "25",
                  width: "auto"
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none">
                    <path fill={headerData ? headerData.client_color : "#fff"} stroke={headerData ? headerData.client_color : "#fff"} d="M.5.5h13.962v14.542H.5z" />
                    <path stroke={headerData ? headerData.client_color : "#fff"} d="M.5 18.632h13.962v14.542H.5zM19.203.5h13.962v14.542H19.203zM19.203 18.632h13.962v14.542H19.203z" />
                  </svg>
                </span>
              </button>
              <button
                className="view-format-dialog-close btn"
                onClick={handleClose}
              >
                <img
                  src="https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/cross-icon.svg"
                  width="25"
                  alt="Fermer"
                />
              </button>
            </div>
          </header>
          <iframe
            src={headerData.catalogue_link}
            width="100%"
            height="90%"
            border="none"
            padding-right="0"
            padding-left="0"
          ></iframe>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Catalog;
