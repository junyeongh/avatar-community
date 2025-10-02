import { Stack } from "expo-router";

import { colors } from "@/constants";

export default function ImageLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
  );
}
