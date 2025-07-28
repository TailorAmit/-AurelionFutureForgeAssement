import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MyTabBar from '../core-components/bottomTabBar/bottomTabBar';
import HomeScreen from '../../screens/Home';
import { COMMON_STRING } from '~/app/constants/constants-strings';
const Tab = createBottomTabNavigator();
const Stack: any = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
};

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={COMMON_STRING.TAB_STRING.HOME}>
            <Tab.Screen name={COMMON_STRING.TAB_STRING.HOME} component={HomeStack} />
        </Tab.Navigator>
    );
};

export default BottomTab;