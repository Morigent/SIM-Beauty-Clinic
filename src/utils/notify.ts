import { Alert, Platform } from "react-native";

// React Native Web renders Alert.alert as a no-op, so the browser gets window.alert.
export function notify(message: string): void {
  if (Platform.OS === "web") {
    window.alert(message);
  } else {
    Alert.alert("LuxeDerm", message);
  }
}
