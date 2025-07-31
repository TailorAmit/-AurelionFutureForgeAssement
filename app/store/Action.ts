// src/store/merchantActions.ts

import axios from 'axios';
import { useMerchantStore } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../constants/config';

export const useMerchantActions = () => {
    const set = useMerchantStore.setState;
    const fetchMerchantDetail = (limit: number, search?: string): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const accssToken = JSON.parse(await AsyncStorage.getItem('Logindetails') || '{}');

                let merchantUrl = 'https://admin.api.kittymagic.in/v1/app/merchant'
                if (limit) {
                    merchantUrl += `?limit=${limit}`
                }
                if (search) {
                    merchantUrl += `&merchant_name=${search}`
                }
                const [merchantRes] = await Promise.all([
                    axios.get(merchantUrl, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accssToken?.token_data?.access_token || ''}`
                        }
                    }),
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

    const fetchbyidMerchantCouponsData = (id: any, limit?: any): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const accssToken = JSON.parse(await AsyncStorage.getItem('Logindetails') || '{}');
                let couponUrls = `https://admin.api.kittymagic.in/v1/app/merchant/${id}/coupons`
                if (limit) {
                    couponUrls += `?limit=${limit}`
                }
                const [CoupensRes] = await Promise.all([
                    axios.get(couponUrls, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${accssToken?.token_data?.access_token || ''}`
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
    const fetchbyidMerchantReviewData = (id: string, limit?: number): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                set({ loading: true, error: null, success: false });
                const accssToken = JSON.parse(await AsyncStorage.getItem('Logindetails') || '{}');

                let ReviewUrls = `https://admin.api.kittymagic.in/v1/app/merchant/${id}/reviews`
                if (limit) {
                    ReviewUrls += `?limit=${limit}`
                }

                const [ReviewRes] = await Promise.all([
                    axios.get(ReviewUrls, {
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
                    axios.post(`${apiUrl}/merchant/${id}/review`, {
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
                    axios.get(`${apiUrl}/merchant/${id}`, {
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
                    axios.get(`${apiUrl}/merchant/${id}`, {
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
                    axios.get(`${apiUrl}/merchant/${id}`, {
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
            reviews: {
                data: [],
                meta: {
                    pagination: {
                        current_page: 0,
                        cursor: '',
                        has_next: false,
                        limit: 0,
                        total_reviews: ''
                    }
                }
            },
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
        LikeReviewData,
    };
};
