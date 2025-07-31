import CouponCard from "@components/CouponCard";
import { CustomHeader } from "@components/header";
import { hasNotch } from "@core-utils/index";
import { Matrics } from "@core-utils/matrics";
import moment from "moment";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMerchantActions } from "~/app/store/Action";
import { useMerchantStore } from "~/app/store/store";

export const CouponScreen = ({ navigation, route }: any) => {

    const { loading, error, merchant, Coupens, reviews } = useMerchantStore();
    const { fetchbyidMerchantCouponsData } = useMerchantActions();

    const callDetailsApi = async (merchant_id: string) => {
        await fetchbyidMerchantCouponsData(merchant_id)
        // await fetchbyidMerchantCouponsData("ef09af28-174c-4369-a4c0-ea4c2aa8f8e2")
    };

    useEffect(() => {
        const merchant_id = route?.params?.merchant_id || ''
        callDetailsApi(merchant_id)
    }, []);


    return (
        <ScrollView>
            <View style={{ flex: 1, paddingTop: hasNotch ? Matrics.vs30 : 0, backgroundColor: '#fff' }}>
                {loading && <ActivityIndicator />}

                <CustomHeader
                    title="Coupons"
                    onBack={() => navigation.goBack()}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> :
                    <View style={{ marginTop: 16, paddingHorizontal: 16, }}>
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
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
    },
});