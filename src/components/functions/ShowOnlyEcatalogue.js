function showOnlyEcatalogue() {
    const shouldHide = (element) =>
        element.id !== 'ecatalogue' && !element.classList?.contains('ReactModalPortal');

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

    // La page hôte peut injecter des éléments dans document.body après ce
    // premier passage (bandeau cookies, chat, tags tiers...). On les cache au
    // fil de l'eau pour conserver l'invariant "seul #ecatalogue visible" au
    // lieu d'un instantané figé au montage. L'appelant doit invoquer la
    // fonction de nettoyage renvoyée (ex. au démontage du composant).
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && shouldHide(node)) {
                    node.style.display = 'none';
                }
            }
        }
    });
    observer.observe(document.body, { childList: true });

    return () => observer.disconnect();
}

export default showOnlyEcatalogue;