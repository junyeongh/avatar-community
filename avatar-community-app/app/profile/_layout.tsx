import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

import { colors } from "@/constants";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name='[id]'
        options={{
          title: "",
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ paddingRight: 12 }}
            >
              <Feather name='arrow-left' size={28} color='black' />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='update'
        options={{
          title: "Edit Profile",
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ paddingRight: 12 }}
            >
              <Feather name='arrow-left' size={28} color='black' />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='avatar'
        options={{
          title: "",
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ paddingRight: 12 }}
            >
              <Feather name='arrow-left' size={28} color='black' />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
