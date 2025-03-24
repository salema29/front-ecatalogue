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
        const html = await postShoppingListImage(filteredList); // Wait for the response
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        tempDiv.style.position = "absolute";
        tempDiv.style.left = "-9999px";
        document.body.appendChild(tempDiv);

        const canvas = await html2canvas(tempDiv, { allowTaint: true, useCORS: true }); // Wait for the image generation
        const image = canvas.toDataURL("image/png");
        document.body.removeChild(tempDiv);

        sendEmail(image);

    } catch (error) {
        console.error("Erreur lors du partage de la liste", error);
    }
};

const sendEmail = async (image) => {
    try {
        // Convert base64 image to Blob
        const res = await fetch(image);
        const blob = await res.blob();

        // Prepare FormData to send the image to the PHP server
        const formData = new FormData();
        formData.append('image', blob, 'shopping-list.png');

        // Use native fetch to send the image to the PHP script
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/post-shopping-list-email`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            console.log("Email sent successfully!");
        } else {
            console.error("Failed to send email:", result.error);
        }
    } catch (err) {
        console.error("Error while sending email:", err);
    }
};
