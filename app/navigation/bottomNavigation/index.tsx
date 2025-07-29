import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MyTabBar from '../core-components/bottomTabBar/bottomTabBar';
import HomeScreen from '../../screens/Home';
import { COMMON_STRING } from '~/app/constants/constants-strings';
import { StyleSheet, Text } from 'react-native';
import { CalendarCheck, CalendarDays, Home, MessageCircle, MessageCircleMore, PawPrint, Store, User } from 'lucide-react-native';
const Tab = createBottomTabNavigator();
const Stack: any = createNativeStackNavigator();

const HomeStack = ({ name }: { name: string }) => {
    return (
        <Stack.Navigator
            initialRouteName={name}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name={name} component={HomeScreen} />
        </Stack.Navigator>
    );
};

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let Icon;
                    switch (route.name) {
                        case 'Merchant':
                            Icon = Store;
                            break;
                        case 'Events':
                            Icon = CalendarCheck;
                            break;
                        case 'Kitties':
                            Icon = PawPrint;
                            break;
                        case 'Chat':
                            Icon = MessageCircleMore;
                            break;
                        case 'Profile':
                            Icon = User;
                            break;
                        default:
                            Icon = Home;
                    }

                    return <Icon size={24} color={focused ? '#E91E63' : '#330411'} fill={focused ? '#ffffffff' : 'none'} />;
                },
                tabBarLabel: ({ focused }) => (
                    <Text style={[styles.label, { color: focused ? '#E91E63' : '#330411' }]}>
                        {route.name}
                    </Text>
                ),
                tabBarStyle: styles.tabBar,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Merchant" children={() => <HomeStack name="Merchant" />} />
            <Tab.Screen name="Events" children={() => <HomeStack name="Events" />} />
            <Tab.Screen name="Kitties" children={() => <HomeStack name="Kitties" />} />
            <Tab.Screen name="Chat" children={() => <HomeStack name="Chat" />} />
            <Tab.Screen name="Profile" children={() => <HomeStack name="Profile" />} />
        </Tab.Navigator>
    );
};
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        height: 70,
        marginBottom: 20,
        paddingTop: 5,
        paddingHorizontal: 12,
        borderTopWidth: 0.5,
        borderTopColor: '#eee',
    },
    label: {
        fontSize: 11,
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 2,
        fontFamily: 'inter-Medium',
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BottomTab;