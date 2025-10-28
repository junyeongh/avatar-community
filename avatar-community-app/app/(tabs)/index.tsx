import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { baseUrl } from "@/api/axios";
import FeedList from "@/components/feed/FeedList";
import SearchInput from "@/components/search/SearchInput";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";

export default function HomeScreen() {
  const { auth } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInputContainer}>
        {auth.id ? (
          <Pressable onPress={() => router.push("/(tabs)/my")}>
            <Image
              source={
                auth.imageUri
                  ? { uri: `${baseUrl}/${auth.imageUri}` }
                  : require("@/assets/images/default-avatar.png")
              }
              style={styles.avatar}
            />
          </Pressable>
        ) : (
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
        )}
        <SearchInput
          placeholder='Search Post Title'
          onPress={() => router.push("/post/search")}
        />
      </View>
      <FeedList />
      {auth.id && (
        <Pressable
          style={styles.writePostButton}
          onPress={() => router.push("/post/write")}
        >
          <Ionicons name='pencil' size={32} color={colors.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  searchInputContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
  },
  logo: {
    width: 44,
    height: 44,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  writePostButton: {
    // layout
    position: "absolute",
    bottom: 16,
    right: 16,
    // dimensions
    width: 64,
    height: 64,
    // flexbox
    alignItems: "center",
    justifyContent: "center",
    // appearance
    backgroundColor: colors.ORANGE_600,
    borderRadius: 32,
    // effects
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
});
