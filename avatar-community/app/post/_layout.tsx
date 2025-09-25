import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor:colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          title: "Write a post",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/"} replace style={{ paddingRight: 12 }}>
              <Feather name="arrow-left" size={28} color="black" />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
