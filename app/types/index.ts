import { GestureResponderEvent } from "react-native";

export interface CustomHeaderProps {
  title?: string;
  onBack?: (event: GestureResponderEvent) => void;
  onShare?: (event: GestureResponderEvent) => void;
  onDelete?: (event: GestureResponderEvent) => void;
  locationSubtitleHandler?: () => void;
  locationSubtitle?: string;
}