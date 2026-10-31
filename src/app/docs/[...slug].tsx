import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function DocsPage() {
  return (
    <View>
      <Text>Docs Page</Text>
      <Pressable onPress={() => router.push("/")}>
        <Text>Go to Next.js Docs</Text>
      </Pressable>
    </View>
  );
}