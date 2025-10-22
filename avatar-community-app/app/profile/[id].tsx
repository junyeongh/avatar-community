import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { baseUrl } from "@/api/axios";
import UserFeedList from "@/components/feed/UserFeedList";
import AuthRoute from "@/components/hoc/AuthRoute";
import Tab from "@/components/ui/Tab";
import { colors } from "@/constants";
import { useAuth, useGetUserProfile } from "@/hooks/queries/useAuth";

interface ProfileScreenProps {}

export default function ProfileScreen({}: ProfileScreenProps) {
  const navigation = useNavigation();

  const { id } = useLocalSearchParams();
  const userId = Number(id);

  const { auth } = useAuth();
  const myUserId = Number(auth.id);
  const { data: profile } = useGetUserProfile(userId);
  const { imageUri, nickname, introduce } = profile || {};

  if (userId === myUserId) {
    return <Redirect href={"/my"} />;
  }

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, [navigation]);

  return (
    <AuthRoute>
      <View style={styles.header}>
        <Image
          source={
            imageUri
              ? {
                  uri: `${baseUrl}/${imageUri}`,
                }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.avatar}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.introduce}>{introduce}</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab isActive>My Posts</Tab>
      </View>
      <UserFeedList userId={userId} />
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  header: {
    // position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 77,
  },
  avatar: {
    position: "absolute",
    left: 16,
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
  },
  // profile container
  container: {
    marginTop: 77,
  },
  profile: {
    padding: 16,
    gap: 16,
  },
  nickname: {
    fontSize: 24,
    fontWeight: "bold",
  },
  introduce: {
    fontSize: 14,
  },
  //
  tabContainer: { flexDirection: "row" },
});
