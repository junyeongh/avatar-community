import { useActionSheet } from "@expo/react-native-action-sheet";
import { Entypo, Octicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthRoute from "@/components/hoc/AuthRoute";
import ListItem from "@/components/ui/ListItem";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { setSecureStore } from "@/utils/secureStore";

export default function SettingScreen() {
  const { logout } = useAuth();

  const { i18n, t } = useTranslation();

  const { showActionSheetWithOptions } = useActionSheet();
  const handlePressLanguage = () => {
    // prettier-ignore
    const options = [
      "English", // 0
      "한국어",  // 1
      t("Cancel"),  // 2
    ]
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0: // English
            i18n.changeLanguage("en");
            dayjs.locale("en");
            setSecureStore("language", "en");
            break;
          case 1: // Korean
            i18n.changeLanguage("ko");
            dayjs.locale("ko");
            setSecureStore("language", "ko");
            break;
          case 2: // Cancel
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <AuthRoute>
      <SafeAreaView>
        {/* space */}
        <View style={{ height: 30 }} />
        <ListItem
          title={t("Languages")}
          onPress={handlePressLanguage}
          icon={<Entypo name='language' size={16} color={colors.BLACK} />}
        />
        {/* space */}
        <View style={{ height: 30 }} />
        <ListItem
          title={t("Sign Out")}
          onPress={logout}
          icon={<Octicons name={"sign-out"} size={16} color={colors.BLACK} />}
        />
      </SafeAreaView>
    </AuthRoute>
  );
}
