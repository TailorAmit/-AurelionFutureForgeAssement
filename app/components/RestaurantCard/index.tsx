import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Touchable, TouchableOpacity, Image } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';

type Props = {
    imageUrl: string;
    rating: number;
    location: string;
    name: string;
    type: string;
    goDetailPage: () => void
    merchant_logo: string
};

const RestaurantCard: React.FC<Props> = ({
    imageUrl,
    rating,
    location,
    name,
    type,
    goDetailPage,
    merchant_logo
}) => {
    console.log("rating", rating)
    return (
        <TouchableOpacity style={styles.card} onPress={goDetailPage}>
            <ImageBackground
                source={{ uri: imageUrl }}
                style={styles.image}
                imageStyle={styles.imageRadius}
            >
                <View style={styles.ratingContainer}>
                    {
                        rating >= 1 ?
                            <Star size={16} color="#FFD700" fill={'#FFD700'} /> :
                            <Star size={16} color="#FFD700" />}

                    <Text style={styles.ratingText}>{rating < 1 ? 0 : rating.toFixed(1)}</Text>
                </View>
            </ImageBackground>

            <View style={styles.locationContainer}>
                <MapPin size={16} color="#ffffff" />
                <Text style={styles.locationText}>{location}</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.avatarPlaceholder} >
                    <Image
                        source={{ uri: merchant_logo }}
                        style={styles.avatar}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>{type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RestaurantCard;

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 16,
        marginRight: 8,
    },
    avatarRadius: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        borderWidth: 1,
        borderColor: '#f8c5d6',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 180,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    imageRadius: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    ratingContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 4,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        fontWeight: '400',
        color: '#000000',
        fontFamily: 'Poppins-Regular',
    },
    locationContainer: {
        backgroundColor: '#F06292',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingHorizontal: 12,
    },
    locationText: {
        color: '#FFFFFF',
        marginLeft: 6,
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        flexShrink: 1,

    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
        marginRight: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Poppins-SemiBold',
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        color: '#666',
    },
});
