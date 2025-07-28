import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { CustomHeader } from '../../components/header';
import { SearchBar } from '../../components/SearchFiled';
import { useState } from 'react';
import TabButton from '../../components/TabButton';
import RestaurantCard from '../../components/RestaurantCard';
import { hasNotch } from '../../utils/index';
import { Matrics } from '../../utils/matrics';
import CouponCard from '../../components/CouponCard';

const HomeScreen = () => {
    const [query, setQuery] = useState('');
    const handlePress = (label: string) => {
        console.log(`${label} tab pressed`);
    };

    return (
        <View style={{ flex: 1, paddingTop: hasNotch ? Matrics.vs30 : 0, }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 16 }}>
                    <CustomHeader
                        title="Merchants"
                        locationSubtitle='Update Your Location'
                    />
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
                        <CouponCard
                            brandName="Swiggy"
                            discountText="Get upto 20% off"
                            description="on Breakfast and lunch by pasting this code before Ordering"
                            code="PRIYA777REF"
                            expiry="3 Days"
                            logoUrl="https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg"
                        />
                        <CouponCard
                            brandName="Swiggy"
                            discountText="Get upto 20% off"
                            description="on Breakfast and lunch by pasting this code before Ordering"
                            code="PRIYA777REF"
                            expiry="3 Days"
                            logoUrl="https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg"
                        />
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <RestaurantCard
                            imageUrl="https://media-cdn.tripadvisor.com/media/photo-l/0d/5d/72/c9/romantic-table-at-restaurant.jpg"
                            rating={4.5}
                            location="Priya’s House, Saravanampatti, Coimbatore"
                            name="Green Leaf Restaurant"
                            type="Hotel & Restaurant"
                        />
                        <RestaurantCard
                            imageUrl="https://media-cdn.tripadvisor.com/media/photo-l/0d/5d/72/c9/romantic-table-at-restaurant.jpg"
                            rating={4.5}
                            location="Priya’s House, Saravanampatti, Coimbatore"
                            name="Green Leaf Restaurant"
                            type="Hotel & Restaurant"
                        />
                        <RestaurantCard
                            imageUrl="https://media-cdn.tripadvisor.com/media/photo-l/0d/5d/72/c9/romantic-table-at-restaurant.jpg"
                            rating={4.5}
                            location="Priya’s House, Saravanampatti, Coimbatore"
                            name="Green Leaf Restaurant"
                            type="Hotel & Restaurant"
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
        backgroundColor: 'transparent',
    },
});

export default HomeScreen;
