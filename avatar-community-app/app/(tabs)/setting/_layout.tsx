import { Stack } from "expo-router";
import React from "react";

import { colors } from "@/constants";

export default function SettingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
          title: "My setting",
        }}
      />
    </Stack>
  );
}
