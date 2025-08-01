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
import { useMerchantStore } from '~/app/store/store';
import Avatar from '@components/Avtar';
import { useMerchantActions } from '~/app/store/Action';
import { DeleteReviewModal } from '@screens/RestaurantDetailScreen/deleteModule';

const AddAndEditReviewScreen = ({ navigation, route }: any) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [deleteReviewModal, showDeleteReviewModal] = useState(false)

    const merchant = route?.params?.merchant
    const ReviewId = route?.params?.ReviewId

    const maxChars = 500;

    const { Logindetails, loading, error } = useMerchantStore();

    const { AddReviewData } = useMerchantActions();

    const handlesubmitData = async () => {
        if (!review) {
            setErrors(['Please Enter a Review']);
            return;
        }
        const data = {
            user_rating: rating, user_review_text: review
        }
        await AddReviewData(data, merchant?.merchant_id);
        navigation.goBack();
    };

    const handleDeleteModal = (text: string) => {
        showDeleteReviewModal(true)
    };

    return (
        <View style={{ flex: 1, paddingTop: hasNotch ? Matrics.vs30 : 0, backgroundColor: '#fff' }}>
            <CustomHeader
                onBack={() => navigation.goBack()}
                title={ReviewId ? "Edit Review" : "Add Review"}
                {...(ReviewId ? {
                    onDelete: () => handleDeleteModal(true)
                } : {})}
            />
            <View style={styles.container}>
                {/* Header */}

                {/* User Row */}
                <View style={styles.userRow}>
                    <Avatar
                        name={Logindetails?.data?.name}
                        image={Logindetails?.data?.profile_image || ''}
                        size={37}
                    />
                    {/* <View style={styles.avatar} /> */}
                    <Text style={styles.userName}>{Logindetails?.data?.name}</Text>
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

                {/* Errors */}
                {errors.length > 0 && (
                    <View style={styles.errorContainer}>
                        {errors.map((error, index) => (
                            <Text key={index} style={styles.errorText}>
                                {error}
                            </Text>
                        ))}
                    </View>
                )}

                {/* Submit Button */}
                <TouchableOpacity style={styles.button} onPress={handlesubmitData}>
                    {ReviewId ? <Text style={styles.buttonText}>Save changes</Text> :
                        <Text style={styles.buttonText}>Post Review</Text>}
                </TouchableOpacity>
            </View>
            <DeleteReviewModal isVisible={deleteReviewModal} onCancel={() => showDeleteReviewModal(false)} onDelete={() => deleteReview(deletedModuleId)} />
        </View>
    );
};

export default AddAndEditReviewScreen;

const styles = StyleSheet.create({
    errorContainer: {
        marginTop: 0,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
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
