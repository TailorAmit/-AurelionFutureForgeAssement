import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface DeleteReviewModalProps {
    isVisible: boolean;
    onCancel: () => void;
    onDelete: () => void;
}

export const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({
    isVisible,
    onCancel,
    onDelete,
}) => {
    return (
        <Modal isVisible={isVisible} backdropOpacity={0.6}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalText}>Are you sure need to Delete{"\n"}your Review ?</Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.noButton} onPress={onCancel}>
                        <Text style={styles.noText}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 24,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'Poppins-Medium',
        color: '#1E000B',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 30,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
    },
    noButton: {
        backgroundColor: '#1E1E1E',
        height: 40,
        borderRadius: 30,
        marginRight: 10,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButton: {
        backgroundColor: '#F17AAB',
        paddingHorizontal: 32,
        borderRadius: 30,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    noText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
    deleteText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
});

