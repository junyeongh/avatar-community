import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthRoute from "@/components/hoc/AuthRoute";

export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        {/* <SafeAreaView edges={["right", "bottom", "left"]}> */}
        <Text>My information screen</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
