import { useEffect, useContext } from "react";
import TagManager from 'react-gtm-module';
import { ClientContext } from "../../store-client";
import { GtmContext } from '../../store-gtm';
import { fetchAnalyticsId } from "./Api";

const GtmLoader = () => {
    const clientContext = useContext(ClientContext);
    const client_id = clientContext?.storedClient;
    const { storedGtmStatus } = useContext(GtmContext);

    useEffect(() => {
        if (!storedGtmStatus || !client_id) return;

        fetchAnalyticsId("gtm", client_id).then((gtmId) => {
            if (gtmId) {
                TagManager.initialize({ gtmId });
            }
        });
    }, [storedGtmStatus, client_id]);

    return null;
};

export default GtmLoader;
