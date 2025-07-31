import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';

interface SearchBarProps extends TextInputProps {
    placeholder?: string;
    value: string;
    onDebouncedChange: (text: string) => void;
    debounceDelay?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search Merchants',
    value,
    onDebouncedChange,
    debounceDelay = 300,
    ...rest
}) => {
    const [internalValue, setInternalValue] = useState(value);
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            onDebouncedChange(internalValue);
        }, debounceDelay);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [internalValue, debounceDelay, onDebouncedChange]);

    const handleClear = () => {
        setInternalValue('');
        onDebouncedChange('');
    };

    return (
        <View style={styles.container}>
            <Search size={20} color="#e91e63" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                value={internalValue}
                onChangeText={setInternalValue}
                underlineColorAndroid="transparent"
                {...rest}
            />
            {internalValue.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                    <X size={18} color="#999" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff0f4',
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 16,
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
    clearButton: {
        marginLeft: 8,
    },
});
