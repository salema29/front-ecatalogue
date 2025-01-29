function showAllElements() {
    // Sélectionner tous les éléments du corps
    const allElements = document.body.children;

    // Parcourir tous les éléments et rétablir leur visibilité
    for (let element of allElements) {
        element.style.display = ''; // Réinitialiser la propriété display
    }
}

export default showAllElements;