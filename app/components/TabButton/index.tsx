// components/TabButton.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Plus } from 'lucide-react-native'; // Lucide Plus icon

interface TabButtonProps {
    label: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const TabButton: React.FC<TabButtonProps> = ({ label, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7}>
            <Text style={[styles.text, textStyle]}>{label}</Text>
            <Plus size={14} color="#3b0a0a" style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f4b8c4', // Light pink border
        marginRight: 8,
        backgroundColor: '#fff',
    },
    text: {
        color: '#3b0a0a', // Dark maroon text
        fontSize: 16,
        marginRight: 4,
        paddingHorizontal: 24,
    },
    icon: {
        marginTop: 1,
    },
});

export default TabButton;
