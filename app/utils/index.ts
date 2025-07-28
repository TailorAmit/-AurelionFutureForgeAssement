import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

export const hasNotch = DeviceInfo.hasNotch();
export const IS_IOS = Platform.OS === 'ios';
