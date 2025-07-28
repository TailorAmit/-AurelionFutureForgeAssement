// src/store/merchantActions.ts

import axios from 'axios';
import { useMerchantStore } from './store';

export const useMerchantActions = () => {
    const set = useMerchantStore.setState;

    const fetchMerchantDetail = (): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });

                const [merchantRes] = await Promise.all([
                    axios.get('https://admin.api.kittymagic.in/v1/app/merchant'),
                ]);

                set({
                    merchant: merchantRes.data,
                    loading: false,
                    success: true,
                });

                resolve();
            } catch (err: any) {
                const message =
                    err.response?.data?.message || err.message || 'Something went wrong';
                set({ loading: false, error: message, success: false });
                reject(message);
            }
        });
    };

    const clearMerchant = () => {
        set({
            merchant: null,
            reviews: [],
            loading: false,
            error: null,
            success: false,
        });
    };

    return {
        fetchMerchantDetail,
        clearMerchant,
    };
};
