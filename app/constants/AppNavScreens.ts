import BottomTab from "@core-navigations/bottomNavigation";
import HomeScreen from "../screens/Home";
import { COMMON_STRING } from "./constants-strings";
import { SearchLocationScreen } from "@screens/Location";
import { RestaurantDetailScreen } from "@screens/RestaurantDetailScreen";
import AddAndEditReviewScreen from "@screens/Review";

export const AppNavScreens = [

    {
        name: COMMON_STRING.STACK_STRING.BOTTOM_TAB,
        component: BottomTab,
    },
    {
        name: COMMON_STRING.STACK_STRING.SEARCH_LOCATION,
        component: SearchLocationScreen,
    },
    {
        name: COMMON_STRING.STACK_STRING.RESTAURANT_DETAIL,
        component: RestaurantDetailScreen,
    },
    {
        name: COMMON_STRING.STACK_STRING.ADD_AND_EDIT_REVIEW,
        component: AddAndEditReviewScreen,
    },
];

export const BottomTabsScreens = [
    {
        name: COMMON_STRING.TAB_STRING.HOME,
        component: HomeScreen,
    },
];
