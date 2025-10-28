import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { getLocales } from "expo-localization";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import i18n from "i18next";
import { useEffect } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import "react-native-reanimated";

import dayjs from "dayjs";

import { queryClient } from "@/api/queryClient";
import { useAuth } from "@/hooks/queries/useAuth";
import useNotificationObserver from "@/hooks/useNotificationObserver";
import { resources } from "@/i18n/resources";
import { getSecureStore } from "@/utils/secureStore";

export const unstable_settings = {
  anchor: "(tabs)",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
        <Toast />
      </QueryClientProvider>
    </ActionSheetProvider>
  );
}
const deviceLanguage = getLocales()[0].languageCode ?? "en";

i18n.use(initReactI18next).init({
  resources: resources,
  lng: deviceLanguage,
  fallbackLng: "en",
});

function RootNavigator() {
  const { auth } = useAuth();
  useNotificationObserver();
  const { t } = useTranslation();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage =
        (await getSecureStore("language")) ?? deviceLanguage;
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
      dayjs.locale(savedLanguage);
    };
    loadLanguage();
  }, [i18n]);

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: "success",
        text1: t("Welcome Message", { nickname: auth.nickname ?? "" }),
        position: "top",
      });
  }, [auth.id]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='auth' />
        <Stack.Screen name='profile' />
        <Stack.Screen name='post' />
        <Stack.Screen name='image' />
        <Stack.Screen
          name='modal'
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
