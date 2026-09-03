const disableEcatalogueAutoScroll = () => {
    const ecatalogueDiv = document.getElementById("ecatalogue");
    if (ecatalogueDiv) {
        ecatalogueDiv.style.overflowY = "";
    }
}

export default disableEcatalogueAutoScroll;