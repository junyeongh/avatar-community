import { router, useFocusEffect } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  const isLoggedIn = false;

  useFocusEffect(() => {
    !isLoggedIn && router.replace("/auth");
  });

  return (
    <SafeAreaView>
      <Text>My information screen</Text>
    </SafeAreaView>
  );
}
