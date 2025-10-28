import { Entypo, Octicons } from "@expo/vector-icons";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthRoute from "@/components/hoc/AuthRoute";
import ListItem from "@/components/ui/ListItem";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";

export default function SettingScreen() {
  const { logout } = useAuth();

  return (
    <AuthRoute>
      <SafeAreaView>
        {/* space */}
        <View style={{ height: 30 }} />
        <ListItem
          title='Languages'
          onPress={() => {
            // TODO: Navigate to languages screen
            console.log("Languages pressed");
          }}
          icon={<Entypo name='language' size={16} color={colors.BLACK} />}
        />
        {/* space */}
        <View style={{ height: 30 }} />
        <ListItem
          title='Sign out'
          onPress={logout}
          icon={<Octicons name='sign-out' size={16} color={colors.BLACK} />}
        />
      </SafeAreaView>
    </AuthRoute>
  );
}
