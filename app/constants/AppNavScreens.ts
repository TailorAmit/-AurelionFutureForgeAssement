import BottomTab from "@core-navigations/bottomNavigation";
import HomeScreen from "../screens/Home";
import { COMMON_STRING } from "./constants-strings";

export const AppNavScreens = [

    {
        name: COMMON_STRING.STACK_STRING.BOTTOM_TAB,
        component: BottomTab,
    },
];

export const BottomTabsScreens = [
    {
        name: COMMON_STRING.TAB_STRING.HOME,
        component: HomeScreen,
    },
    // {
    //     name: COMMON_STRING.TAB_STRING.SHIFT,
    //     component: ShiftScreen,
    // },
    // {
    //     name: COMMON_STRING.TAB_STRING.PEOPLE,
    //     component: PeopleScreen,
    // },
    // {
    //     name: COMMON_STRING.TAB_STRING.FOOD,
    //     component: FoodScreen,
    // },
    // {
    //     name: COMMON_STRING.TAB_STRING.PROFILE,
    //     component: ProfileScreen,
    // },
];
