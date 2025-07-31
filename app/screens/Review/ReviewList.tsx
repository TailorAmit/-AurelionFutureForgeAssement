import CouponCard from "@components/CouponCard";
import { CustomHeader } from "@components/header";
import ReviewCard from "@components/ReviewCard";
import { hasNotch } from "@core-utils/index";
import { Matrics } from "@core-utils/matrics";
import { Star } from "lucide-react-native";
import moment from "moment";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useMerchantActions } from "~/app/store/Action";
import { useMerchantStore } from "~/app/store/store";

export const RattingListScreen = ({ navigation, route }: any) => {
    const merchant = route?.params?.merchant
    const ratingsData = {
        average: merchant?.avg_rating,
        totalReviews: merchant?.total_review_count,
        breakdown: merchant?.rating_distribution,
    };


    const { reviews } = useMerchantStore();
    const { fetchbyidMerchantReviewData } = useMerchantActions();

    const callDetailsApi = async (merchant_id: string) => {
        await fetchbyidMerchantReviewData("ef09af28-174c-4369-a4c0-ea4c2aa8f8e2")
    };

    useEffect(() => {
        const merchant_id = route?.params?.merchant_id || ''
        callDetailsApi(merchant_id)
    }, []);

    return (
        <View style={{ flex: 1, paddingTop: hasNotch ? Matrics.vs30 : 0, backgroundColor: '#fff' }}>
            <CustomHeader
                title="Reviews & Ratings"
                onBack={() => navigation.goBack()}
            />
            <View style={{ paddingHorizontal: 16 }}>
                <View style={styles.container}>
                    <View style={styles.contentRow}>
                        {/* Left: Average Rating */}
                        <View style={styles.left}>
                            <View style={styles.ratingRow}>
                                <Star size={24} color="#fbbf24" fill="#fbbf24" />
                                <Text style={styles.ratingBig}>{ratingsData.average.toFixed(1)}</Text>
                            </View>
                            <Text style={styles.reviewCountBig}>
                                ({ratingsData.totalReviews} Reviews)
                            </Text>
                        </View>

                        {/* Right: Rating Bars */}
                        <View style={styles.right}>
                            {Object.entries(ratingsData.breakdown)
                                .sort((a, b) => Number(b[0]) - Number(a[0]))
                                .map(([rating, count]) => {
                                    const widthPercent = (count / 5) * 100;
                                    return (
                                        <View style={styles.barRow} key={rating}>
                                            <Text style={styles.barLabel}>{rating}</Text>
                                            <View style={styles.barBackground}>
                                                <View
                                                    style={[
                                                        styles.barFill,
                                                        { width: `${widthPercent}%` },
                                                    ]}
                                                />
                                            </View>
                                        </View>
                                    );
                                })}
                        </View>
                    </View>
                </View>

                <View>
                    <FlatList
                        data={reviews?.data || []}
                        renderItem={({ item, index }) => {
                            return <View>
                                <ReviewCard
                                    name={item?.user_name}
                                    date={moment(item?.updated_at.slice(0, 10)).format('DD/MM/YYYY')}
                                    rating={item?.user_rating}
                                    review={item?.user_review_text}
                                    isVerified
                                    likeCount={23}
                                />
                                {reviews?.data?.length - 1 !== index &&
                                    <View style={styles.bottomLine} />
                                }
                            </View>
                        }}
                    />
                </View>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    bottomLine: {
        height: 1,
        backgroundColor: '#DBDBDB',
        marginTop: 10,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#e91e63',
        marginRight: 4,
    },
    couponcontainer: {
        paddingTop: 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        color: '#330411',
    },
    addReview: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        color: '#e91e63',
    },

    contentRow: {
        flexDirection: 'row',
        marginTop: 16,
    },

    left: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewCount: {
        fontSize: 13,
        color: '#888',
        marginTop: 4,
        fontFamily: 'Poppins-Regular',
    },
    right: {
        width: '50%',
        justifyContent: 'space-between',
    },
    barRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    barLabel: {
        width: 14,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#000000',
        marginRight: 8,
        fontWeight: '400',
    },
    barBackground: {
        flex: 1,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ddd',
        overflow: 'hidden',
    },
    barFill: {
        height: 7,
        backgroundColor: '#fbbf24',
        borderRadius: 4,
    },
    ratingBig: {
        fontSize: 28,
        fontWeight: '400',
        color: '#330411',
        marginLeft: 8,
        fontFamily: 'Poppins-Regular',
    },
    reviewCountBig: {
        fontSize: 16,
        color: '#000000',
        marginTop: 4,
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
    },
});
