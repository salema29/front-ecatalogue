import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GtmPageViewHandler = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: "pageview",
                page: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
};

export default GtmPageViewHandler;
