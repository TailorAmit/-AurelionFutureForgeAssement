import React, { useRef, useState } from 'react';
import {
    View,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');
const SPACING = 16;
const ITEM_WIDTH = width - SPACING * 2;

type Props = {
    Data: string[];
};

export default function ImageSlider({ Data }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / (ITEM_WIDTH + SPACING));
        setActiveIndex(index);
    };

    return (
        <View style={{ paddingVertical: 16 }}>
            <FlatList
                ref={flatListRef}
                data={Data}
                horizontal
                pagingEnabled
                snapToInterval={ITEM_WIDTH + SPACING}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            width: ITEM_WIDTH,
                            marginRight: index === Data.length - 1 ? 0 : SPACING,
                        }}
                    >
                        <Image source={{ uri: item }} style={styles.image} />
                    </View>
                )}
            />

            <View style={styles.dotsContainer}>
                {Data.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => flatListRef.current?.scrollToIndex({ index, animated: true })}
                        style={[
                            styles.dot,
                            activeIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        borderRadius: 16,
        overflow: 'hidden',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#e91e63',
        width: 10,
        height: 10,
    },
});
