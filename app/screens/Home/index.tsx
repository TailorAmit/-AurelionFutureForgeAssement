import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { CustomHeader } from '../../components/header';
import { SearchBar } from '../../components/SearchFiled';
import { useEffect, useState } from 'react';
import TabButton from '../../components/TabButton';
import RestaurantCard from '../../components/RestaurantCard';
import { hasNotch } from '../../utils/index';
import { Matrics } from '../../utils/matrics';
import CouponCard from '../../components/CouponCard';
import { COMMON_STRING } from '~/app/constants/constants-strings';
import { useMerchantStore } from '~/app/store/store';
import { useMerchantActions } from '~/app/store/Action';
import _ from 'lodash';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [query, setQuery] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [merchantData, setMerchantData] = useState<any>([]);
    const handlePress = (label: string) => {
        if (categoryName === label) {
            setCategoryName('')
            setMerchantData((merchants?.data?.data?.merchants || []));
        } else {
            setCategoryName(label)
            setMerchantData((merchants?.data?.data?.merchants || []).filter((item: any) => {
                const allCategories = item.categories.map((category: any) => category.category_name);
                return allCategories.includes(label);
            }));
        }
    };

    const { loading, error, merchants } = useMerchantStore();
    const { fetchMerchantDetail } = useMerchantActions();

    useEffect(() => {
        fetchMerchantDetail()
            .then(() => {
                console.log('Merchant loaded');
            })
            .catch((err) => {
                console.warn('Failed to load:', err);
            });
    }, []);

    useEffect(() => {
        setMerchantData(merchants?.data?.data?.merchants)
    }, [merchants])


    const categories = merchants?.data?.data?.categories || [];

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>Error: {error}</Text>;
    if (!merchants) return null;

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
                        <FlatList
                            data={categories}
                            horizontal
                            renderItem={({ item }) => {
                                return <TabButton
                                    label={item.category_name}
                                    activeIndex={categoryName === item.category_name}
                                    onPress={() => handlePress(item.category_name)} />
                            }}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <FlatList
                            data={merchantData}
                            renderItem={({ item }) => {
                                const categories = item.categories.map((category: any) => category.category_name).join(', ');
                                return (
                                    <RestaurantCard
                                        imageUrl={item.merchant_thumbnail_url}
                                        rating={item.avg_rating}
                                        location="Priya’s House, Saravanampatti, Coimbatore"
                                        name={item.merchant_name}
                                        type={categories}
                                        merchant_logo={item.merchant_logo}
                                        goDetailPage={() =>
                                            navigation.navigate(COMMON_STRING.STACK_STRING.RESTAURANT_DETAIL, { item })
                                        }
                                    />
                                );
                            }}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={
                                <View style={{ alignItems: 'center', marginTop: 40 }}>
                                    <Text style={{ fontSize: 16, color: '#999' }}>No record found</Text>
                                </View>
                            }
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
