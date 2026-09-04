import html2canvas from "html2canvas";

/**
 * Rend une chaine HTML hors ecran et renvoie le <canvas> produit par html2canvas.
 * Le conteneur temporaire est toujours retire du DOM, meme en cas d'erreur.
 *
 * @param {string} html
 * @param {object} [options] options supplementaires passees a html2canvas
 */
export const renderHtmlToCanvas = async (html, options = {}) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html || "";
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    document.body.appendChild(tempDiv);

    try {
        return await html2canvas(tempDiv, { allowTaint: true, useCORS: true, ...options });
    } finally {
        document.body.removeChild(tempDiv);
    }
};

export default renderHtmlToCanvas;
