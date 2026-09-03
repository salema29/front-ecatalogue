import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCategoriesPerCatalogue from "../components/navigation/useCategoriesPerCatalogue";
import disableEcatalogueAutoScroll from "../components/functions/DisableScroll";
import showOnlyEcatalogue from "../components/functions/ShowOnlyEcatalogue";
import { fetchViewChoice } from "../components/functions/Api";
import useCatalogHeader from "../components/functions/useCatalogHeader";
import useIsMobile from "../components/functions/useIsMobile";
import crossIconDark from "../assets/icons/cross-icon-dark.svg";
import { ShoppingListContext } from '../store-shopping-list';
import ListCourse  from '../components/shoppingList/shoppingListIcon';
import ShoppingListModal from "../components/shoppingList/shoppingListModal";
import  "../assets/styles/CatalogueOverview.css"

function Catalog() {
  const ALLOW_ORIGIN_ACCESS_URL = process.env.REACT_APP_IFRAME_ALLOW_ORIGIN_ACCESS_URL ;
  const { catalogId } = useParams();
  const headerData = useCatalogHeader(catalogId);
  const isMobileView = useIsMobile(1024);
  const [viewChoice, setViewChoice] = useState({
    isVueProduit : true,
    isVueFeuilletable : true
  });
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(`/`);
    window.location.reload();
  };

  const { firstCategorieId } = useCategoriesPerCatalogue(catalogId);

  const handleProductView = () => {
    navigate(`/product-list/${catalogId}/${firstCategorieId}`);
  };

  const { shoppingList } = useContext(ShoppingListContext);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    disableEcatalogueAutoScroll();
  }, []);

  useEffect(() => {
    async function fetchChoiceForView() {
      const choice = await fetchViewChoice(catalogId);
      setViewChoice(choice);
    }
    fetchChoiceForView();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handlePostMessage = (event) => {
      if (event.origin === `${ALLOW_ORIGIN_ACCESS_URL}`) {
        const { action, page } = event.data;
        if (action === "updatePage") {
          const urlParams = new URLSearchParams(window.location.search);
          // Update or add the 'page' query parameter with the new value
          urlParams.set('page', page);
          // Update the URL (keeping the hash part intact)
          window.history.pushState(
            {},
            '',
            window.location.pathname + window.location.hash.split('?')[0] + '?' + urlParams.toString()
          );
        }
      }
    };

    window.addEventListener("message", handlePostMessage);
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("message", handlePostMessage);
    };
  }, [ALLOW_ORIGIN_ACCESS_URL]);
  // Get the part of the URL after the hash
  const hash = window.location.hash;
  const urlParams = new URLSearchParams(hash.split('?')[1]);
  const page = urlParams.get('page') || 1; // Default to page 1 if no page param is found

  useEffect(() => {
    showOnlyEcatalogue();
  }, []);

  return (
    <>
      {headerData ? (
        <>
          <header className="header">
            <div className="view-format-dialog-left-part">
              <img
                className="header-logo"
                src={isMobileView ? headerData.client_logo_mobile : headerData.client_logo_desktop }
                alt=""
              />
              <div className="header-text">
                <p className="catalogue-name" style={{ color: headerData ? headerData.client_color : "#fff" }} >
                  {headerData.catalogue_name_ln_un}{" "}
                  {headerData.catalogue_name_ln_deux}
                </p>
                <p className="catalogue-date" style={{ color: "black" }}>
                  du {headerData.catalogue_date_validite_debut} au {" "}
                  {headerData.catalogue_date_validite_fin}
                </p>
              </div>
            </div>
            <div className="view-format-dialog-right-part">
              {viewChoice.isVueProduit && (
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
              )}
              {headerData.show_list_course === 't' ?
                  (
                      <button
                          className="view-format-dialog-open-list-course btn"
                          onClick={() => setModalOpen(true)}
                          title="Ouvrir ma liste de courses"
                      >
                          <ListCourse catalogId ={catalogId} shoppingList={shoppingList} clientColor = {headerData ? headerData.client_color : "#669999"}/>
                      </button>
                  )
                  :(<></>)
              }
              <button
                className="view-format-dialog-close btn"
                onClick={handleClose}
              >
                <img
                  src={crossIconDark}
                  width="25"
                  alt="Fermer"
                />
              </button>
            </div>
          </header>
          <iframe
            src={`${headerData.catalogue_link}?page=${page}`}
            width="100%"
            height="90%"
            border="none"
            padding-right="0"
            padding-left="0"
            title={headerData.catalogue_name_ln_un}
          ></iframe>
          {modalOpen && ( <ShoppingListModal catalogId ={catalogId} isOpen={modalOpen} onClose={() => setModalOpen(false)} clientColor = {headerData.client_color} /> )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Catalog;
