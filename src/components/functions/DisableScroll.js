const disableEcatalogueAutoScroll = () => {
    const ecatalogueDiv = document.getElementById("ecatalogue");
    console.log(ecatalogueDiv);
    ecatalogueDiv.style.overflowY = "";
}

export default disableEcatalogueAutoScroll;