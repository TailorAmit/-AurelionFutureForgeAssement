// src/store/merchantActions.ts

import axios from 'axios';
import { useMerchantStore } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                    merchants: merchantRes.data,
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
    const fetchbyidMerchantDetail = (id: any): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const accssToken = JSON.parse(await AsyncStorage.getItem('Logindetails') || '{}')?.token_data?.access_token || '';
                const [merchantRes] = await Promise.all([
                    axios.get(`https://admin.api.kittymagic.in/v1/app/merchant/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accssToken}`
                        }
                    }),
                ]);
                set({
                    merchant: merchantRes.data?.data || {},
                    loading: false,
                    success: true,
                });

                resolve();
            } catch (err: any) {
                const message =
                    err.response?.data?.message || err.message || 'Something went wrong';
                set({ loading: false, error: message?.error || message, success: false });
                reject(message);
            }
        });
    };

    const AutoLogin = (): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const [Logindetails] = await Promise.all([
                    axios.post(`https://admin.api.kittymagic.in/v1/dashboard/auth/login`, {
                        "email": "tailoramit01007@gmail.com",
                        "password": "testPassword",
                        "auth_type": "CREDENTIALS"
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }),
                ]);
                AsyncStorage.setItem("Logindetails", JSON.stringify(Logindetails?.data?.data));
                set({
                    Logindetails: Logindetails?.data?.data,
                    loading: false,
                    success: true,
                });

                resolve();
            } catch (err: any) {
                const message =
                    err.response?.data?.message || err.message || 'Something went wrong';
                set({ loading: false, error: message?.error || message, success: false });
                reject(message);
            }
        });
    };

    const fetchbyidMerchantCouponsData = (id: any): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const accssToken = JSON.parse(await AsyncStorage.getItem('Logindetails') || '{}');
                const [CoupensRes] = await Promise.all([
                    axios.get(`https://admin.api.kittymagic.in/v1/app/merchant/${id}/coupons?cursor=${accssToken?.data?.user_id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accssToken?.token_data?.access_token || ''}`
                        }
                    }),
                ]);
                set({
                    Coupens: CoupensRes.data?.data || {},
                    loading: false,
                    success: true,
                });

                resolve();
            } catch (err: any) {
                const message =
                    err.response?.data?.message || err.message || 'Something went wrong';
                set({ loading: false, error: message?.error || message, success: false });
                reject(message);
            }
        });
    };
    const fetchbyidMerchantReviewData = (id: any): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const accssToken = JSON.parse(await AsyncStorage.getItem('Logindetails') || '{}');
                const [ReviewRes] = await Promise.all([
                    axios.get(`https://admin.api.kittymagic.in/v1/app/merchant/${id}/coupons?cursor=${accssToken?.data?.user_id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accssToken?.token_data?.access_token || ''}`
                        }
                    }),
                ]);
                set({
                    reviews: ReviewRes.data?.data || {},
                    loading: false,
                    success: true,
                });

                resolve();
            } catch (err: any) {
                const message =
                    err.response?.data?.message || err.message || 'Something went wrong';
                set({ loading: false, error: message?.error || message, success: false });
                reject(message);
            }
        });
    };

    const AddReviewData = (data: any, id: string): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const accssToken = JSON.parse(await AsyncStorage.getItem('Logindetails') || '{}')?.token_data?.access_token || '';
                const [AddReviewRes] = await Promise.all([
                    axios.post(`https://admin.api.kittymagic.in/v1/app/merchant/${id}/review`, {
                        data: { ...data }
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accssToken}`
                        }
                    }),
                ]);
                set({
                    reviews: AddReviewRes.data?.data || {},
                    loading: false,
                    success: true,
                });

                resolve();
            } catch (err: any) {
                const message =
                    err.response?.data?.message || err.message || 'Something went wrong';
                set({ loading: false, error: message?.error || message, success: false });
                reject(message);
            }
        });
    };

    const UpdateReviewData = (data: any, id: any): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const accssToken = JSON.parse(await AsyncStorage.getItem('Logindetails') || '{}')?.token_data?.access_token || '';
                const [ReviewRes] = await Promise.all([
                    axios.get(`https://admin.api.kittymagic.in/v1/app/merchant/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accssToken}`
                        }
                    }),
                ]);
                set({
                    reviews: ReviewRes.data?.data || {},
                    loading: false,
                    success: true,
                });

                resolve();
            } catch (err: any) {
                const message =
                    err.response?.data?.message || err.message || 'Something went wrong';
                set({ loading: false, error: message?.error || message, success: false });
                reject(message);
            }
        });
    };

    const DeleteReviewData = (data: any, id: any): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const accssToken = JSON.parse(await AsyncStorage.getItem('Logindetails') || '{}')?.token_data?.access_token || '';
                const [ReviewRes] = await Promise.all([
                    axios.get(`https://admin.api.kittymagic.in/v1/app/merchant/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accssToken}`
                        }
                    }),
                ]);
                set({
                    reviews: ReviewRes.data?.data || {},
                    loading: false,
                    success: true,
                });

                resolve();
            } catch (err: any) {
                const message =
                    err.response?.data?.message || err.message || 'Something went wrong';
                set({ loading: false, error: message?.error || message, success: false });
                reject(message);
            }
        });
    };

    const LikeReviewData = (data: any, id: any): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const accssToken = JSON.parse(await AsyncStorage.getItem('Logindetails') || '{}')?.token_data?.access_token || '';
                const [ReviewRes] = await Promise.all([
                    axios.get(`https://admin.api.kittymagic.in/v1/app/merchant/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accssToken}`
                        }
                    }),
                ]);
                set({
                    reviews: ReviewRes.data?.data || {},
                    loading: false,
                    success: true,
                });

                resolve();
            } catch (err: any) {
                const message =
                    err.response?.data?.message || err.message || 'Something went wrong';
                set({ loading: false, error: message?.error || message, success: false });
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
        AutoLogin,
        fetchbyidMerchantCouponsData,
        fetchbyidMerchantDetail,
        fetchbyidMerchantReviewData,
        AddReviewData,
        UpdateReviewData,
        DeleteReviewData,
        LikeReviewData
    };
};
