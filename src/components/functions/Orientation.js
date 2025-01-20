const handleOrientationChange = () => {
    const ecatalogueDiv = document.getElementById("ecatalogue");

    // Vérifie si l'appareil est un mobile (par largeur d'écran) et en orientation paysage
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const isMobile = window.innerHeight <= 768; // Définit une largeur max pour mobiles (ajustez si nécessaire)

    if (ecatalogueDiv) {
        if (isMobile && isLandscape) {
            ecatalogueDiv.style.overflowY = "auto";
        } else {
            ecatalogueDiv.style.overflowY = ""; // Réinitialise si non applicable
        }
    }
};

export default handleOrientationChange;