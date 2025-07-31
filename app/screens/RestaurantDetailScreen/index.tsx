import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Platform,
    FlatList,
} from 'react-native';
import {
    Star,
    Phone,
    LocateFixed,
    Globe,
    LayoutPanelLeft,
    MapPin,
    ChevronRight,
} from 'lucide-react-native';
import ImageSlider from '@components/ImageSlider';
import { CustomHeader } from '@components/header';
import { hasNotch } from '@core-utils/index';
import { Matrics } from '@core-utils/matrics';
import CouponCard from '@components/CouponCard';
import ReviewCard from '@components/ReviewCard';
import { COMMON_STRING } from '~/app/constants/constants-strings';
import { useMerchantStore } from '~/app/store/store';
import { useMerchantActions } from '~/app/store/Action';
import { Linking } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import { useFocusEffect } from '@react-navigation/native';

export const RestaurantDetailScreen = ({ navigation, route }: any) => {

    const { loading, error, merchant, Coupens, reviews } = useMerchantStore();
    const { fetchbyidMerchantDetail, fetchbyidMerchantCouponsData, fetchbyidMerchantReviewData } = useMerchantActions();

    const openMaps = (outletLocation: string) => {
        const url = Platform.select({
            ios: `http://maps.apple.com/?daddr=${encodeURIComponent(outletLocation)}`,
            android: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(outletLocation)}`,
        });
        Linking.openURL(url as string).catch(err => console.error('An error occurred', err));
    };

    const callDetailsApi = async (merchant_id: string) => {
        await fetchbyidMerchantDetail(merchant_id)
        await fetchbyidMerchantCouponsData(merchant_id, 2)
        await fetchbyidMerchantReviewData(merchant_id, 2)
        // await fetchbyidMerchantCouponsData("ef09af28-174c-4369-a4c0-ea4c2aa8f8e2", 2)
        // await fetchbyidMerchantReviewData("ef09af28-174c-4369-a4c0-ea4c2aa8f8e2", 2)
    };

    useFocusEffect(
        React.useCallback(() => {
            const merchant_id = route?.params?.item?.merchant_id || ''
            callDetailsApi(merchant_id)
            return () => {
            };
        }, [])
    );


    const category = merchant?.category?.map((item: any) => item?.category_name).join(', ');

    const ratingsData = {
        average: merchant?.avg_rating,
        totalReviews: merchant?.total_review_count,
        breakdown: merchant?.rating_distribution,
    };
    const myReview = merchant?.latest_reviews?.filter((item: any) => item?.review_id === route?.params?.item?.merchant_id || '')
    console.log("myReview", myReview)

    return (
        <View style={{ flex: 1, paddingTop: hasNotch ? Matrics.vs30 : 0, backgroundColor: '#fff' }}>
            <CustomHeader
                onBack={() => navigation.goBack()}
                onShare={() => console.log('Share')}
            />
            {loading && <ActivityIndicator />}
            {error ? <Text style={styles.errorText}>{error}</Text> :
                <ScrollView style={styles.container}>
                    {/* Header Icons */}
                    <ImageSlider Data={_.map(merchant?.merchant_images, (item: any) => item?.merchant_image_url)} />
                    <View style={styles.content}>
                        {/* Info Section */}
                        <View style={styles.info}>
                            <View style={styles.category}>
                                <Text style={{ marginRight: 4 }}>
                                    <LayoutPanelLeft size={12} color="#f59e0b" />
                                </Text>
                                <Text style={styles.categoryText}>
                                    {category}
                                </Text>
                            </View>
                            <View style={styles.rating}>
                                <Text style={{ marginRight: 4 }}>
                                    <Star size={12} color="#f59e0b" />
                                </Text>
                                <Text style={styles.ratingText}>
                                    {merchant?.avg_rating} ({merchant?.total_review_count} Reviews)
                                </Text>
                            </View>
                            <View style={styles.dottedLineHorizontal} />
                            <View style={styles.restaurantInfo} >
                                <View style={styles.avatarPlaceholder} >
                                    <Image
                                        source={{ uri: merchant?.merchant_logo || '' }}
                                        style={styles.avatar}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.title}>{merchant?.merchant_name || ''}</Text>
                                    <View style={styles.locationContainer}>
                                        <MapPin size={12} color="#330411" style={{ marginRight: 8 }} />
                                        <Text style={styles.location}>Saravanampatti , Coimbatore</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.actionRow}>
                            <TouchableOpacity style={styles.actionButton} onPress={() => Linking.openURL(`tel:${merchant?.outlet?.outlet_phone_number}`)}>
                                <Phone size={20} color="#e91e63" />
                                <Text style={styles.actionText}>Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}
                                onPress={() => openMaps(merchant?.outlet?.outlet_loction_name || "")}>
                                <LocateFixed size={20} color="#e91e63" />
                                <Text style={styles.actionText}>Locate Me</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.websiteButton} onPress={() => Linking.openURL(merchant?.outlet?.outlet_loction_url || '')} >
                            <Globe size={20} color="#e91e63" />
                            <Text style={styles.websiteText}>View the website</Text>
                        </TouchableOpacity>

                        <View style={styles.dottedLineHorizontal} />

                        {/* About Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>About</Text>
                            <View style={{ marginTop: 16 }}>
                                <Text style={styles.paragraph}>
                                    {merchant?.merchant_description}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.dottedLineHorizontal} />

                        {/* Coupons */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Coupons</Text>
                            <View style={{ marginTop: 16 }}>
                                <FlatList
                                    data={Coupens?.data || []}
                                    renderItem={({ item }) => {
                                        return <CouponCard
                                            brandName={item?.coupon_provider?.coupon_provider_name}
                                            discountText={`Get upto ${item?.coupon_offer_percentage} off`}
                                            description={item?.coupon_description}
                                            code={item?.coupon_code}
                                            expiry={moment(item?.coupon_end_date, "YYYY-MM-DD").fromNow()}
                                            logoUrl={item?.coupon_provider?.coupon_provider_logo}
                                            claimNow={() => Linking.openURL(item?.coupon_provider?.coupon_provider_link)}
                                        />
                                    }}

                                />
                            </View>
                            <View style={styles.couponcontainer}>
                                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate(COMMON_STRING.STACK_STRING.COUPON_DETAIL, {
                                    merchant_id: route?.params?.item?.merchant_id || ''
                                })}>
                                    <Text style={styles.text}>View All {Coupens?.meta?.pagination?.total_coupons} Coupons</Text>
                                    <ChevronRight size={16} color="#e91e63" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dottedLineHorizontal} />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Your Review</Text>
                            <View style={{ marginBottom: 16 }}>
                                <View>
                                    <ReviewCard
                                        name="Priya"
                                        date="3/7/2024"
                                        rating={"4"}
                                        review="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                        isUserReview
                                        onEdit={() => navigation.navigate(COMMON_STRING.STACK_STRING.ADD_AND_EDIT_REVIEW)}
                                        onDelete={() => console.log('Delete')}
                                    />
                                    <View style={styles.dottedLineHorizontal} />
                                </View>

                                <View style={styles.container}>
                                    <View style={[styles.headerRow, { marginTop: 20 }]}>
                                        <Text style={styles.title}>Ratings and Reviews</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate(COMMON_STRING.STACK_STRING.ADD_AND_EDIT_REVIEW, {
                                            merchant_id: merchant?.merchant_id
                                        })}>
                                            <Text style={styles.addReview}>Add Review</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.contentRow}>
                                        {/* Left: Average Rating */}
                                        <View style={styles.left}>
                                            <View style={styles.ratingRow}>
                                                <Star size={24} color="#fbbf24" fill="#fbbf24" />
                                                <Text style={styles.ratingBig}>{ratingsData?.average?.toFixed(1)}</Text>
                                            </View>
                                            <Text style={styles.reviewCountBig}>
                                                ({ratingsData.totalReviews} Reviews)
                                            </Text>
                                        </View>

                                        {/* Right: Rating Bars */}
                                        <View style={styles.right}>
                                            {Object.entries(ratingsData.breakdown || {})
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


                                    <View style={styles.couponcontainer}>
                                        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate(COMMON_STRING.STACK_STRING.REVIEW_DETAIL, {
                                            merchant: merchant
                                        })}>
                                            <Text style={styles.text}>View All Reviews </Text>
                                            <ChevronRight size={16} color="#e91e63" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>}
        </View >
    );
}


const styles = StyleSheet.create({
    avatar: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
        marginRight: 8,
    },
    bottomLine: {
        height: 1,
        backgroundColor: '#DBDBDB',
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
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
    line: {
        height: 1,
        backgroundColor: '#f8b8cf',
        marginTop: 6,
        marginHorizontal: 12,
    },

    couponcontainer: {
        paddingTop: 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        paddingHorizontal: 16,
    },
    container: {
        backgroundColor: '#fff',
    },
    restaurantInfo: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    locationContainer: {
        paddingTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
        marginRight: 12,
    },
    info: {
        // padding: 16,
        paddingTop: 15,
        justifyContent: 'center',
    },
    category: {
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dottedLineHorizontal: {
        flex: 1,
        height: 1,
        borderStyle: 'dotted',
        borderWidth: 1,
        borderColor: '#FFBDCF', // or any color
        marginTop: 20,
    },
    categoryText: {
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#330411',
    },
    rating: {
        fontSize: 12,
        color: '#f59e0b',
        marginBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontWeight: '400',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#000000',
        textDecorationLine: 'underline',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        color: '#330411',
    },
    location: {
        color: '#330411',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 18,
    },
    actionButton: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#e91e63',
        borderRadius: 12,
        alignItems: 'center',
        width: '47%',
        height: 50,
        justifyContent: 'center',
    },
    actionText: {
        marginLeft: 8,
        color: '#e91e63',
        fontWeight: '400',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    websiteButton: {
        borderWidth: 1,
        borderColor: '#e91e63',
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    websiteText: {
        marginLeft: 8,
        color: '#e91e63',
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    section: {
        paddingTop: 20,
    },
    sectionTitle: {
        fontWeight: '600',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#330411',
    },
    paragraph: {
        color: '#330411',
        lineHeight: 20,
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
        fontSize: 14,
    },
    couponCard: {
        borderWidth: 1,
        borderColor: '#e91e63',
        borderRadius: 12,
        flexDirection: 'row',
        marginBottom: 16,
        overflow: 'hidden',
    },
    couponLeft: {
        backgroundColor: '#fce4ec',
        padding: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    couponLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 8,
    },
    claimText: {
        color: '#e91e63',
        fontWeight: '500',
        fontSize: 12,
    },
    couponDetails: {
        flex: 1,
        padding: 12,
    },
    discountTitle: {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 4,
    },
    discountDesc: {
        color: '#444',
        fontSize: 13,
        marginBottom: 6,
    },
    couponCode: {
        fontSize: 14,
        color: '#e91e63',
        fontWeight: '600',
        marginBottom: 4,
    },
    expiryText: {
        fontSize: 12,
        color: '#888',
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
    // rating: {
    //     fontSize: 28,
    //     fontWeight: '600',
    //     color: '#330411',
    //     marginLeft: 8,
    //     fontFamily: 'Poppins-SemiBold',
    // },
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
