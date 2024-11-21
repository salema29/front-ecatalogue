import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Catalog() {
  const { catalogId } = useParams();
  const [slideData, setSlideData] = useState(null);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/`);
  };

  useEffect(() => {
    fetch(`http://localhost/admin-ecatalogue-v2/api/getOneSlide/${catalogId}`)
      .then((response) => response.json())
      .then((fetchedData) => setSlideData(fetchedData))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [catalogId]);

  return (
    <>
      {slideData ? (
        <>
          <header className="header">
            <div className="view-format-dialog-left-part">
              <img
                className="header-logo"
                src={slideData.client_logo}
                alt=""
              />
              <div className="header-text">
                <p>
                  {slideData.catalogue_name_ln_un}{" "}
                  {slideData.catalogue_name_ln_deux}
                </p>
                <p>
                  du {slideData.catalogue_date_validite_debut} au{" "}
                  {slideData.catalogue_date_validite_fin}
                </p>
              </div>
            </div>
            <div className="view-format-dialog-right-part">
              <button
                className="view-format-switcher btn"
                onClick={handleClose}
              >
                <img
                  src="https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/assets/icons/by-catalog-icon.svg"
                  height="25"
                  width="auto"
                  alt="Vue catalogue"
                />
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
            src={slideData.catalogue_link}
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
