import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-in"
        options={{ presentation: Platform.OS === "web" ? "card" : "modal" }}
      />
      <Stack.Screen name="profile" />
      <Stack.Screen name="user/index" />
      <Stack.Screen name="admin/index" />
      <Stack.Screen name="doctor/index" />
    </Stack>
  );
}
