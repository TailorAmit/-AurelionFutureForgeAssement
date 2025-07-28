// components/SearchBar.tsx

import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Search } from 'lucide-react-native';

interface SearchBarProps extends TextInputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search Merchants',
    value,
    onChangeText,
    ...rest
}) => {
    return (
        <View style={styles.container}>
            <Search size={20} color="#e91e63" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid="transparent"
                {...rest}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff0f4',
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 24,
        height: 50,
        borderWidth: 1,
        borderColor: '#f8c5d6',
        alignSelf: 'center',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#333',
        fontSize: 16,
    },
});

