function showOnlyEcatalogue() {
    // Sélectionner tous les éléments du corps
    const allElements = document.body.children;
    
    // Parcourir tous les éléments et cacher ceux qui ne sont pas #ecatalogue
    for (let element of allElements) {
        if (element.id !== 'ecatalogue') {
            element.style.display = 'none';
        }
    }

    // Assurez-vous que #ecatalogue est visible
    const ecatalogueElement = document.getElementById('ecatalogue');
    if (ecatalogueElement) {
        ecatalogueElement.style.display = 'block';
    }

    const modalElements = document.querySelectorAll('.ReactModalPortal');
    for (let modalElement of modalElements) {
        if (modalElement) {
            modalElement.style.display = 'block';
        }
    }
}

export default showOnlyEcatalogue;