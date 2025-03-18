import html2canvas from 'html2canvas';
import { postShoppingListImage } from "../functions/Api";

export const handleShoppingListToImage = (shoppingList, catalogId = null) => {
    
    let filteredList = shoppingList;
    
    if (catalogId) {
        filteredList = shoppingList.filter(catalog => catalog.catalogId === catalogId);
    }

    if (filteredList.length === 0) {
        console.warn("Aucun produit trouvé pour ce catalogId.");
        return;
    }
    
    postShoppingListImage(filteredList).then(html => {
        // Créer un élément temporaire pour afficher l'HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        tempDiv.style.position = "absolute";  // Le rendre invisible
        tempDiv.style.left = "-9999px";
        document.body.appendChild(tempDiv);

        // Convertir en image
        html2canvas(tempDiv, { allowTaint: true, useCORS: true }).then(canvas => {
            const image = canvas.toDataURL("image/png");

            // Télécharger l'image
            const link = document.createElement("a");
            link.href = image;
            link.download = "shopping-list.png";
            link.click();

            // Nettoyage du DOM
            document.body.removeChild(tempDiv);
        }).catch(error => {
            console.error('Erreur lors de la génération de l\'image', error);
        });
    });
};