import { useEffect, useState } from "react";

/**
 * Hauteur disponible sous l'element `selector` :
 * `window.innerHeight - hauteur(selector)`.
 *
 * Recalculee apres `delay` ms (le temps que le header sticky se stabilise
 * dans le DOM), a chaque `resize`, et quand une des `deps` change.
 * Renvoie `window.innerHeight` tant que `enabled` est faux.
 *
 * Remplace les effets dupliques `updateHeight` / `updateHeightResultatSearch`
 * de ProductList et ProductDetail (avec, en prime, le clearTimeout au cleanup
 * qui manquait).
 */
const useHeightBelow = (selector, { enabled = true, delay = 0, deps = [] } = {}) => {
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        if (!enabled) return undefined;

        const update = () => {
            const el = document.querySelector(selector);
            const elHeight = el ? el.getBoundingClientRect().height : 0;
            setHeight(window.innerHeight - elHeight);
        };

        const timer = setTimeout(update, delay);
        window.addEventListener("resize", update);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", update);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector, enabled, delay, ...deps]);

    return height;
};

export default useHeightBelow;
