import CouponCard from "@components/CouponCard";
import { CustomHeader } from "@components/header";
import { hasNotch } from "@core-utils/index";
import { Matrics } from "@core-utils/matrics";
import { View } from "react-native";

export const CouponScreen = ({ navigation }: any) => {
    return (
        <View style={{ flex: 1, paddingTop: hasNotch ? Matrics.vs30 : 0, backgroundColor: '#fff' }}>
            <CustomHeader
                title="Coupons"
                onBack={() => navigation.goBack()}
            />
            <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
                <CouponCard
                    brandName="Swiggy"
                    discountText="Get upto 20% off"
                    description="on Breakfast and lunch by pasting this code before Ordering"
                    code="PRIYA777REF"
                    expiry="3 Days"
                    logoUrl="https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg"
                />
                <CouponCard
                    brandName="Swiggy"
                    discountText="Get upto 20% off"
                    description="on Breakfast and lunch by pasting this code before Ordering"
                    code="PRIYA777REF"
                    expiry="3 Days"
                    logoUrl="https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg"
                />
            </View>
        </View>
    );
};