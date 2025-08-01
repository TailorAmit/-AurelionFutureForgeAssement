import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {
    ArrowLeft,
    Search,
    LocateFixed,
    MapPin,
    ExternalLink,
    X,
    Link,
    ArrowUpRight,
} from 'lucide-react-native';
import { CustomHeader } from '@components/header';
import { SearchBar } from '@components/SearchFiled';

const locations = [
    'Saravanampatti , Coimbatore',
    'Thudiyalur , Coimbatore',
    'Kgisl College ,Gandhipuram, Coimbatore, 638701.',
    'Gandhipuram , Coimbatore',
];

const history = [
    'Saravanampatti , Coimbatore',
    'Thudiyalur , Coimbatore',
    'Kgisl College ,Gandhipuram, Coimbatore, 638701.',
];

export const SearchLocationScreen = ({ navigation }: { navigation: any }) => {
    const [query, setQuery] = useState('');

    const searchHandler = (text: string) => {
        setQuery(text);
    };

    return (
        <View style={styles.container}>
            <CustomHeader
                title="Search Location"
                onBack={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={{ paddingHorizontal: 16 }}>
                    <View style={{ paddingTop: 20 }}>
                        <SearchBar placeholder="Search Location" value={query} onDebouncedChange={(text) => searchHandler(text)} />
                    </View>

                    {/* Use Current Location */}
                    <TouchableOpacity style={styles.currentLocation}>
                        <LocateFixed size={20} color="#e91e63" />
                        <Text style={styles.currentLocationText}>Use Current Location</Text>
                    </TouchableOpacity>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Search Results */}
                        <Text style={styles.sectionTitle}>Search Results</Text>
                        {locations.map((location, index) => (
                            <View key={index} style={styles.listItem}>
                                <View style={styles.listLeft}>
                                    <MapPin size={16} color="#330411" />
                                    <Text style={styles.locationText}>{location}</Text>
                                </View>
                                <ArrowUpRight size={18} color="#e91e63" />
                            </View>
                        ))}

                        {/* Location History */}
                        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Location History</Text>
                        {history.map((location, index) => (
                            <View key={index} style={styles.listItem}>
                                <View style={styles.listLeft}>
                                    <MapPin size={16} color="#330411" />
                                    <Text style={styles.locationText}>{location}</Text>
                                </View>
                                <X size={20} color="#e91e63" />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 48,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        marginLeft: 16,
        fontSize: 20,
        fontWeight: '600',
        color: '#e91e63',
    },
    searchBox: {
        flexDirection: 'row',
        backgroundColor: '#fce4ec',
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 12,
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
        color: '#e91e63',
    },
    currentLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    currentLocationText: {
        marginLeft: 8,
        fontWeight: '500',
        color: '#e91e63',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#330411',
        marginBottom: 4,
        marginTop: 20,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    listLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },
    locationText: {
        marginLeft: 8,
        color: '#330411',
        flex: 1,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
    },
});
