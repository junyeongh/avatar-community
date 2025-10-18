import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthRoute from "@/components/hoc/AuthRoute";
import { useAuth } from "@/hooks/queries/useAuth";

export default function SettingScreen() {
  const { logout } = useAuth();

  return (
    <AuthRoute>
      <SafeAreaView>
        {/* <SafeAreaView edges={["right", "bottom", "left"]}> */}
        <Text onPress={logout}>Log out</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
