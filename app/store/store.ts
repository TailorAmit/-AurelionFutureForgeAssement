// src/store/merchantStore.ts

import { create } from 'zustand';



export type Meta = {
    pagination: {
        current_page: number
        cursor: string
        has_next: boolean
        limit: number
        total_reviews?: string
        total_coupons?: string
    }
}
export type ReviewItems = {
    review_id: string;
    user_id: string;
    user_name: string;
    user_profile_url: string;
    user_email: string;
    user_rating: string;
    user_review_text: string;
    _count: {
        review_count: number
    },
    updated_at: string;
    is_liked_by_user: boolean
}

export type Review = {
    data: ReviewItems[];
    meta: Meta
}

export type Merchant = {
    merchant_images: [
        {
            merchant_image_id: string;
            merchant_image_url: string;
            created_at: string
        }
    ],
    avg_rating: number;
    total_review_count: number;
    outlet: {
        outlet_id: string;
        outlet_phone_number: string;
        outlet_loction_name: string;
        outlet_loction_url: string;
    },
    merchant_id: string;
    merchant_name: string;
    merchant_thumbnail_url: string;
    merchant_logo: string;
    merchant_description: string;
    merchant_website_url: string;
    category: [
        {
            category_id: string;
            category_name: string;
        }
    ],
    latest_coupons: [];
    rating_distribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    },
    user_self_review: string | null | undefined;
    latest_reviews: any;
};

type couponItems = {
    coupon_id: string;
    coupon_code: string;
    coupon_offer_percentage: string;
    coupon_start_date: string;
    coupon_end_date: string;
    coupon_description: string;
    coupon_type: string;
    is_public: boolean;
    coupon_provider: {
        coupon_provider_id: string;
        coupon_provider_name: string;
        coupon_provider_logo: string;
        coupon_provider_link: string;
    }
}

export type Coupens = {
    data: couponItems[];
    meta: Meta
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
    merchants: Merchant | null;
    merchant: Merchant | null;
    Coupens: Coupens | null;
    Logindetails: Logindetails | null;
    reviews: Review;
    loading: boolean;
    error: string | null;
    success: boolean;
};



export const useMerchantStore = create<MerchantStore>(() => ({
    merchants: null,
    merchant: null,
    Logindetails: null,
    Coupens: null,
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
}));
