import 'react-native-url-polyfill/auto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavScreens } from '~/app/constants/AppNavScreens';
import { useMerchantActions } from '~/app/store/Action';
import { useEffect } from 'react';


const Stack = createNativeStackNavigator();

export const StackNavigation = () => {


    const { AutoLogin } = useMerchantActions();

    useEffect(() => {
        const getAuthData = async () => {
            await AutoLogin()
        }
        getAuthData()
    }, [])
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