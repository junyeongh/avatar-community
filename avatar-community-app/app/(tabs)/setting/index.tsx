import AuthRoute from "@/components/hoc/AuthRoute";
import { useAuth } from "@/hooks/queries/useAuth";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  const { logout } = useAuth();

  return (
    <AuthRoute>
      <SafeAreaView>
        <Text onPress={logout}>Log out</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
