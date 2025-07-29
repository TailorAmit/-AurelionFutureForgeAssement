// src/store/merchantStore.ts

import { create } from 'zustand';

export type Review = {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
};

export type Merchant = {
    id: string;
    name: string;
    image: string;
    category: string;
    location: string;
    rating: number;
};

export type Coupens = {
    id: string;
    name: string;
    image: string;
    category: string;
    location: string;
    rating: number;
}

export type Logindetails = {
    data: {
        user_id: string,
        name: string,
        email: string,
        role: string
        profile_image: string
    },
    token_data: {
        access_token: string,
        refresh_token: string
    }
};

type MerchantStore = {
    merchants: Merchant[] | null;
    merchant: Merchant | null;
    Coupens: Coupens[] | null;
    Logindetails: Logindetails | null;
    reviews: Review[];
    loading: boolean;
    error: string | null;
    success: boolean;
};



export const useMerchantStore = create<MerchantStore>(() => ({
    merchants: null,
    merchant: null,
    Logindetails: null,
    Coupens: null,
    reviews: [],
    loading: false,
    error: null,
    success: false,
}));
