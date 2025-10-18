import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

// import "react-native-reanimated";

import { queryClient } from "@/api/queryClient";
import { useAuth } from "@/hooks/queries/useAuth";

export const unstable_settings = {
  anchor: "(tabs)",
};

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

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: "success",
        text1: `${auth.nickname ?? "회원"}님 환영합니다!`,
        position: "top",
      });
  });

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='auth' />
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
