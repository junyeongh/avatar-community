import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FixedBottomCTA from "@/components/hoc/FixedBottomCTA";

interface NotFoundScreenProps {}

export default function NotFoundScreen({}: NotFoundScreenProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        This page is not found.
      </Text>
      <FixedBottomCTA
        label='Go back to Home screen'
        onPress={() => router.push("/")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
