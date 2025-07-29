import React from 'react';
import { View, Text, Image, StyleSheet, ImageStyle, ViewStyle, TextStyle } from 'react-native';

interface AvatarProps {
    name: string;
    image?: string; // optional image URL or local source
    size?: number;
    backgroundColor?: string;
    textColor?: string;
    style?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({
    name,
    image,
    size = 48,
    backgroundColor = '#ccc',
    textColor = '#fff',
    style,
}) => {
    const firstChar = name?.charAt(0)?.toUpperCase() || '?';

    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: image ? 'transparent' : backgroundColor,
                },
                style,
            ]}
        >
            {image ? (
                <Image
                    source={{ uri: image }}
                    style={[
                        StyleSheet.absoluteFillObject,
                        { borderRadius: size / 2, width: size, height: size },
                    ]}
                    resizeMode="cover"
                />
            ) : (
                <Text style={[styles.initials, { fontSize: size / 2, color: textColor }]}>
                    {firstChar}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    initials: {
        fontWeight: '600',
    },
});

export default Avatar;
