import { Copy } from 'lucide-react-native';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Clipboard,
    Image,
} from 'react-native';
import Svg, { Rect, Circle, Defs, ClipPath } from 'react-native-svg';
const RibbonWithNotches = () => {
    const width = 59;
    const height = 200;
    const notchRadius = 10;
    const notchesCount = 6;
    const spacing = height / (notchesCount + 1);
    const ribbonColor = '#FF789D';

    return (
        <View style={styles.ribbonWrapper}>
            <View style={[styles.ribbonTopBar, { backgroundColor: ribbonColor }]} />
            <Svg height={height} width={width}>
                <Defs>
                    <ClipPath id="clip">
                        <Rect x="0" y="0" width={width} height={height} rx="0" ry="0" />
                        {[...Array(notchesCount)].map((_, i) => (
                            <Circle
                                key={i}
                                cx={0}
                                cy={spacing * (i + 1)}
                                r={notchRadius}
                                fill="black"
                            />
                        ))}
                    </ClipPath>
                </Defs>

                <Rect
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                    fill={ribbonColor} // <== same color
                    clipPath="url(#clip)"
                />
            </Svg>
            <View style={[styles.ribbonBottomBar, { backgroundColor: ribbonColor }]} />
            <View style={[styles.textWrapper]}>
                <Text style={styles.ribbonText}>Flat OFF</Text>
            </View>
        </View>
    );
};

type CouponCardProps = {
    brandName: string;
    discountText: string;
    description: string;
    code: string;
    expiry: string;
    logoUrl: string;
};

const CouponCard: React.FC<CouponCardProps> = ({
    brandName,
    discountText,
    description,
    code,
    expiry,
    logoUrl,
}) => {
    const copyToClipboard = () => {
        Clipboard.setString(code);
        Alert.alert('Copied', 'Coupon code copied to clipboard!');
    };

    return (
        <View style={styles.card}>
            <RibbonWithNotches />
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: logoUrl }} style={styles.logo} />
                        <Text style={styles.brand}>{brandName}</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.claimNow}>Claim Now</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.discount}>{discountText}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.instructions}>
                    Copy this code before going to Claim now
                </Text>

                <TouchableOpacity style={styles.codeContainer} onPress={copyToClipboard}>
                    <Copy size={16} color="#FF789D" style={styles.copyIcon} />
                    <Text style={styles.code}>{code}</Text>
                </TouchableOpacity>

                <Text style={styles.expiry}>
                    Offer ends in <Text style={styles.expiryHighlight}>{expiry}</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        marginBottom: 16,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    content: {
        flex: 1,
        padding: 14,
        borderWidth: 1,
        borderColor: '#FF789D',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 4,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    brand: {
        fontWeight: '500',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#330411',
    },
    claimNow: {
        color: '#ff3366',
        fontWeight: 'bold',
        fontSize: 13,
    },
    discount: {
        marginTop: 17,
        fontWeight: '600',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#330411',

    },
    description: {
        fontSize: 14,
        marginTop: 2,
        fontFamily: 'Poppins-Regular',
        color: '#330411',
        fontWeight: '400',
    },
    instructions: {
        fontSize: 14,
        marginTop: 8,
        color: '#999',
        fontFamily: 'Poppins-Regular',
        fontWeight: "400",
    },
    copyIcon: {
        marginRight: 11,
    },
    codeContainer: {
        borderWidth: 1.5,
        borderColor: '#FF5B77',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginVertical: 12,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderStyle: 'dashed',
        marginTop: 8
    },
    code: {
        marginLeft: 6,
        color: '#FF789D',
        fontWeight: '500',
        fontSize: 16.14,
        fontFamily: 'Poppins-Mediam',
    },
    expiry: {
        fontSize: 12,
        color: '#555',
        fontWeight: "400",
        fontFamily: 'Poppins-Regular',
        marginTop: 8
    },
    expiryHighlight: {
        color: '#ff3366',
        fontWeight: "400",
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    ribbonWrapper: {
        width: 59,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    ribbonTopBar: {
        height: 40,
        width: '100%',
        borderTopLeftRadius: 16,
    },
    ribbonBottomBar: {
        height: 40,
        width: '100%',
        borderBottomLeftRadius: 16,
    },
    textWrapper: {
        position: 'absolute',
        transform: [{ rotate: '-90deg' }],
    },
    ribbonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 15
    },
});

export default CouponCard;
