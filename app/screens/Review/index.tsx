import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { ArrowLeft, Star } from 'lucide-react-native';
import { hasNotch } from '@core-utils/index';
import { Matrics } from '@core-utils/matrics';
import { CustomHeader } from '@components/header';

const AddAndEditReviewScreen = ({ navigation }: any) => {
    const [rating, setRating] = useState(4);
    const [review, setReview] = useState('');
    const maxChars = 500;

    return (
        <View style={{ flex: 1, paddingTop: hasNotch ? Matrics.vs30 : 0, backgroundColor: '#fff' }}>
            <CustomHeader
                onBack={() => navigation.goBack()}
                title="Add Review"
            />
            <View style={styles.container}>
                {/* Header */}

                {/* User Row */}
                <View style={styles.userRow}>
                    <View style={styles.avatar} />
                    <Text style={styles.userName}>Priya</Text>
                </View>

                {/* Stars */}
                <View style={styles.starRow}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <TouchableOpacity key={i} onPress={() => setRating(i)}>
                            <Star
                                size={26}
                                color="#fbbf24"
                                fill={i <= rating ? '#fbbf24' : 'none'}
                                stroke="#fbbf24"
                                style={{ marginRight: 4 }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Review Text */}
                <Text style={styles.label}>Your Review</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        multiline
                        placeholder="Write your review..."
                        value={review}
                        maxLength={maxChars}
                        onChangeText={setReview}
                    />
                    <Text style={styles.charCount}>{`${review.length}/${maxChars}`}</Text>
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Post Review</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddAndEditReviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 16,
        position: "relative"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerText: {
        fontSize: 18,
        color: '#330411',
        fontFamily: 'Poppins-SemiBold',
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 12,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ccc',
    },
    userName: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#330411',
    },
    starRow: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    label: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        color: '#330411',
        marginBottom: 8,
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: '#f8cdd9',
        backgroundColor: '#fff1f5',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        position: 'relative',
        marginBottom: 24,
    },
    input: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#000',
        textAlignVertical: 'top',
    },
    charCount: {
        position: 'absolute',
        bottom: 8,
        right: 12,
        fontSize: 12,
        color: '#888',
        fontFamily: 'Poppins-Regular',
    },
    button: {
        position: 'absolute',
        backgroundColor: '#f47191',
        paddingVertical: 14,
        borderRadius: 24,
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
        bottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
    },
});
