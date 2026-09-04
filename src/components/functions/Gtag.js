import { useEffect, useContext } from "react";
import ReactGA from "react-ga4";
import { ClientContext } from "../../store-client";
import { fetchAnalyticsId } from "./Api";

export default function useGtagPerClient() {
    const clientContext = useContext(ClientContext);
    const client_id = clientContext?.storedClient;

    useEffect(() => {
        if (!client_id) return;

        fetchAnalyticsId("gtag", client_id).then((gtagId) => {
            if (gtagId) {
                ReactGA.initialize(gtagId);
            }
        });
    }, [client_id]);
}
