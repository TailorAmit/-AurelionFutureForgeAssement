import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { CustomHeader } from '../../components/header';
import { SearchBar } from '../../components/SearchFiled';
import { useState } from 'react';
import TabButton from '../../components/TabButton';
import RestaurantCard from '../../components/RestaurantCard';
import { hasNotch } from '../../utils/index';
import { Matrics } from '../../utils/matrics';
import CouponCard from '../../components/CouponCard';
import { COMMON_STRING } from '~/app/constants/constants-strings';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [query, setQuery] = useState('');
    const handlePress = (label: string) => {
        console.log(`${label} tab pressed`);
    };

    return (
        <View style={{ flex: 1, paddingTop: hasNotch ? Matrics.vs30 : 0, backgroundColor: '#fff' }}>
            <CustomHeader
                title="Merchants"
                locationSubtitle='Update Your Location'
                locationSubtitleHandler={() => navigation.navigate(COMMON_STRING.STACK_STRING.SEARCH_LOCATION)}
            />
            <ScrollView>
                <View style={{ paddingHorizontal: 16 }}>
                    <View>
                        <SearchBar value={query} onChangeText={setQuery} />
                    </View>

                    <View style={{ marginTop: 16 }}>
                        <ScrollView horizontal contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
                            <TabButton label="Hotels" onPress={() => handlePress('Hotels')} />
                            <TabButton label="Restaurants" onPress={() => handlePress('Restaurants')} />
                            <TabButton label="Cafes" onPress={() => handlePress('Cafes')} />
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <RestaurantCard
                            imageUrl="https://media-cdn.tripadvisor.com/media/photo-l/0d/5d/72/c9/romantic-table-at-restaurant.jpg"
                            rating={4.5}
                            location="Priya’s House, Saravanampatti, Coimbatore"
                            name="Green Leaf Restaurant"
                            type="Hotel & Restaurant"
                            goDetailPage={() => navigation.navigate(COMMON_STRING.STACK_STRING.RESTAURANT_DETAIL)}
                        />
                        <RestaurantCard
                            imageUrl="https://media-cdn.tripadvisor.com/media/photo-l/0d/5d/72/c9/romantic-table-at-restaurant.jpg"
                            rating={4.5}
                            location="Priya’s House, Saravanampatti, Coimbatore"
                            name="Green Leaf Restaurant"
                            type="Hotel & Restaurant"
                            goDetailPage={() => navigation.navigate(COMMON_STRING.STACK_STRING.RESTAURANT_DETAIL)}
                        />
                        <RestaurantCard
                            imageUrl="https://media-cdn.tripadvisor.com/media/photo-l/0d/5d/72/c9/romantic-table-at-restaurant.jpg"
                            rating={4.5}
                            location="Priya’s House, Saravanampatti, Coimbatore"
                            name="Green Leaf Restaurant"
                            type="Hotel & Restaurant"
                            goDetailPage={() => navigation.navigate(COMMON_STRING.STACK_STRING.RESTAURANT_DETAIL)}
                        />
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default HomeScreen;
