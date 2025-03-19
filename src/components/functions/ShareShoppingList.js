import html2canvas from 'html2canvas';
import { postShoppingListImage } from "../functions/Api";

export const handleShoppingListShare = async (shoppingList, catalogId = null) => {
    let filteredList = shoppingList;

    if (catalogId) {
        filteredList = shoppingList.filter(catalog => catalog.catalogId === catalogId);
    }

    if (filteredList.length === 0) {
        console.warn("Aucun produit trouvé pour ce catalogId.");
        return;
    }

    try {
        const html = await postShoppingListImage(filteredList); // Attendre la réponse
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        tempDiv.style.position = "absolute";
        tempDiv.style.left = "-9999px";
        document.body.appendChild(tempDiv);

        const canvas = await html2canvas(tempDiv, { allowTaint: true, useCORS: true }); // Attendre la génération de l'image
        const image = canvas.toDataURL("image/png");
        document.body.removeChild(tempDiv);

        if (navigator.share) {
            try {
                const res = await fetch(image);
                const blob = await res.blob();
                const file = new File([blob], "shopping-list.png", { type: "image/png" });

                await navigator.share({
                    title: "Ma liste de courses",
                    text: "Voici ma liste de courses. Partage-la avec tes amis !",
                    files: [file],
                });

            } catch (err) {
                console.error("Partage annulé ou erreur lors de la conversion en blob", err);
            }
        } else {
            downloadImage(image);
        }

    } catch (error) {
        console.error("Erreur lors du partage de la liste", error);
    }
};

const downloadImage = (image) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "shopping-list.png";
    link.click();
};
