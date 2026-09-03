import { useEffect, useState } from "react";

/**
 * Renvoie `true` quand la largeur de la fenêtre est <= `breakpoint`
 * (767 px par défaut), et se met à jour au redimensionnement.
 *
 * Remplace le trio dupliqué :
 *   const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);
 *   useEffect(() => { ... addEventListener("resize", ...) ... }, []);
 */
const useIsMobile = (breakpoint = 767) => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;
