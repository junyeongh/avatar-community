import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/constants";

export default function ImageZoomScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { marginTop: insets.top, marginBottom: insets.bottom },
      ]}
    >
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Feather name='chevron-left' size={28} color={colors.BLACK} />
      </Pressable>
      <Image source={{ uri }} style={styles.image} resizeMode='contain' />
    </View>
  );
}

const styles = StyleSheet.create({
  // containers
  container: {
    flex: 1,
    backgroundColor: "#33333333",
  },
  // elements
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 1,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
});
