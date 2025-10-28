import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

// import "react-native-reanimated";

import { queryClient } from "@/api/queryClient";
import { useAuth } from "@/hooks/queries/useAuth";
import useNotificationObserver from "@/hooks/useNotificationObserver";

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

function RootNavigator() {
  const { auth } = useAuth();
  useNotificationObserver();

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: "success",
        text1: `${auth.nickname ?? "회원"}님 환영합니다!`,
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
