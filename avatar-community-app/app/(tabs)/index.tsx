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
          <Image
            source={
              auth.imageUri
                ? { uri: `${baseUrl}/${auth.imageUri}` }
                : require("@/assets/images/default-avatar.png")
            }
            style={styles.avatar}
          />
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
    marginBottom: 8,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: colors.WHITE,
    flexDirection: "row",
  },
  logo: { height: 44, width: 44 },
  avatar: { height: 44, width: 44 },
  writePostButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.ORANGE_600,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 2,
  },
});
