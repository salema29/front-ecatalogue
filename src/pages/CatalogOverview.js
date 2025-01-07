import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryPerCatalogue from "../components/navigation/CategoryPerCatalogue";
import cross from "../assets/icons/cross-icon-dark.svg";

function Catalog() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const ASSET_BASE_URL = process.env.REACT_APP_API_ASSET_URL;
  const { catalogId } = useParams();
  const [headerData, setHeaderData] = useState(null);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/`);
  };

  const { firstCategorieId } = CategoryPerCatalogue(catalogId);

  const handleProductView = () => {
    navigate(`/product-list/${catalogId}/${firstCategorieId}`);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/getOneSlide/${catalogId}`)
      .then((response) => response.json())
      .then((fetchedData) => setHeaderData(fetchedData))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [catalogId, API_BASE_URL]);

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
                <p style={{ color: "black" }}>
                  du {headerData.catalogue_date_validite_debut} au {" "}
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
                  // src="https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/cross-icon.svg"
                  // src={cross}
                  src={`${ASSET_BASE_URL}/icons/cross-icon-dark.svg`}
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
            title={headerData.catalogue_name_ln_un}
          ></iframe>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Catalog;
