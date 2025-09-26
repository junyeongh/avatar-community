import AuthRoute from "@/components/hoc/AuthRoute";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>My information screen</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
