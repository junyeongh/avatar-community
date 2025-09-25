import { queryClient } from "@/api/queryClient";
import { useAuth } from "@/hooks/queries/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
// import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
      <Toast />
    </QueryClientProvider>
  );
}

function RootNavigator() {
  const { auth } = useAuth();
  console.log("auth", auth);

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
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="post" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
