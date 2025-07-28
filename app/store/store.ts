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

type MerchantStore = {
    merchant: Merchant | null;
    reviews: Review[];
    loading: boolean;
    error: string | null;
    success: boolean;
};

export const useMerchantStore = create<MerchantStore>(() => ({
    merchant: null,
    reviews: [],
    loading: false,
    error: null,
    success: false,
}));
