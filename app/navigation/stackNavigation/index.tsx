import { Text, View } from 'react-native';
import HomeScreen from '../../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavScreens } from '~/app/constants/AppNavScreens';

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={AppNavScreens[0]?.name}
            screenOptions={{ headerShown: false }}>
            {AppNavScreens?.map((screen, index) => {
                return (
                    <Stack.Screen
                        key={index}
                        name={screen?.name}
                        component={screen?.component}
                    />
                );
            })}
        </Stack.Navigator>
    );
}