import AuthRoute from "@/components/AuthRoute";
import { useAuth } from "@/hooks/queries/useAuth";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
  const { logout } = useAuth();

  return (
    <AuthRoute>
      <SafeAreaProvider>
        <SafeAreaView>
          <Text onPress={logout}>Log out</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthRoute>
  );
}
