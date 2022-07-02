import { useEffect, useRef } from 'react';
import axios from 'axios';

import { useKeycloak } from '@react-keycloak/web';

export const useAxios = () => {
    const axiosInstance = useRef();
    const { keycloak, initialized } = useKeycloak();
    const kcToken = keycloak?.token ?? '';

    useEffect(() => {
        axiosInstance.current = axios.create({
            headers: {
                Authorization: initialized ? `Bearer ${kcToken}` : undefined,
            },
        });

        /*return () => {
            axiosInstance.current = undefined;
        };*/
    }, [initialized, kcToken]);

    return axiosInstance;
};