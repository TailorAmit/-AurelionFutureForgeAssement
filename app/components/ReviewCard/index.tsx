import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Star, Trash2, Edit, ThumbsUp, BadgeCheck } from 'lucide-react-native';

interface ReviewCardProps {
    name: string;
    date: string;
    rating: number;
    review: string;
    isUserReview?: boolean;
    isVerified?: boolean;
    likeCount?: number;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
    name,
    date,
    rating,
    review,
    isUserReview = false,
    isVerified = false,
    likeCount = 0,
    onEdit,
    onDelete,
}) => {
    return (
        <View style={[styles.card, isUserReview && styles.cardWithBorder]}>
            <View style={styles.headerRow}>
                <View style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>{name}</Text>
                        {isVerified && (
                            <Text style={styles.verified}>
                                <BadgeCheck size={23} color="white" fill={'#e91e63'} c />
                            </Text>
                        )}
                        <Text style={styles.date}>{date}</Text>
                    </View>
                </View>

                {isUserReview ? (
                    <View style={styles.actionIcons}>
                        <TouchableOpacity onPress={onDelete}>
                            <Trash2 size={20} color="#e91e63" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onEdit} style={{ marginLeft: 12 }}>
                            <Edit size={20} color="#e91e63" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.likeRow}>
                        <Text style={styles.likeCount}>{likeCount}</Text>
                        <ThumbsUp size={20} color="#e91e63" />
                    </View>
                )}
            </View>

            {/* Star Rating */}
            <View style={styles.starsRow}>
                {Array.from({ length: 5 }, (_, i) => (
                    <View style={styles.star} key={i}>
                        <Star
                            key={i}
                            size={16}
                            color={i < rating ? '#fbbf24' : '#e5e7eb'}
                            fill={i < rating ? '#fbbf24' : 'none'}
                        />
                    </View>
                ))}
            </View>

            <Text style={styles.reviewText}>{review}</Text>

            <View style={styles.bottomLine} />
        </View>
    );
};

export default ReviewCard;

const styles = StyleSheet.create({
    star: {
        marginRight: 12,
    },
    card: {
        marginBottom: 16,
    },
    cardWithBorder: {
        paddingBottom: 12,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    name: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        fontWeight: '500',
        color: '#330411',
        marginRight: 4,
    },
    verified: {
        color: '#e91e63',
        fontSize: 12,
        marginRight: 4,
    },
    date: {
        fontSize: 12,
        color: '#8B8B8B',
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
    },
    actionIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeCount: {
        marginTop: 10,
        fontSize: 12,
        color: '#e91e63',
        marginRight: 4,
        fontFamily: 'Poppins-Regular',
    },
    starsRow: {
        flexDirection: 'row',
        marginTop: 12,
    },
    reviewText: {
        marginTop: 12,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#000000',
        lineHeight: 20,
        fontWeight: '400',
    },
    bottomLine: {
        height: 1,
        backgroundColor: '#DBDBDB',
        marginTop: 10,
    },
});
