// ID client courant : priorité à la variable d'environnement de test, sinon la
// valeur de l'input caché #catalogue-client injecté par la page hôte.
// Renvoie null si aucune source n'est disponible.
export const getClientId = () =>
    process.env.REACT_APP_CLIENT_ID_TEST ||
    document.getElementById('catalogue-client')?.value ||
    null;
