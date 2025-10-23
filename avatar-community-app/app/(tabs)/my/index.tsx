import { router } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

import { baseUrl } from "@/api/axios";
import LikedFeedList from "@/components/feed/LikedFeedList";
import MyFeedList from "@/components/feed/MyFeedList";
import AuthRoute from "@/components/hoc/AuthRoute";
import Button from "@/components/ui/Button";
import Tab from "@/components/ui/Tab";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";

export default function MyScreen() {
  const [currentTab, setCurrentTab] = useState(0);

  const pagerViewRef = useRef<PagerView>(null);
  const myFeedListRef = useRef<FlatList>(null);
  const likedFeedListRef = useRef<FlatList>(null);

  const handlePressTab = (index: number) => {
    setCurrentTab(index);
    pagerViewRef.current?.setPage(index);

    // Scroll to top when tab is pressed
    switch (index) {
      case 0:
        myFeedListRef.current?.scrollToOffset({ offset: 0, animated: true });
        break;
      case 1:
        likedFeedListRef.current?.scrollToOffset({ offset: 0, animated: true });
        break;
    }
  };

  const { auth } = useAuth();

  return (
    <AuthRoute>
      <View style={styles.header}>
        <Image
          source={
            auth.imageUri
              ? {
                  uri: `${baseUrl}/${auth.imageUri}`,
                }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.avatar}
        />
        <Button
          size='medium'
          variant='outlined'
          label='Edit Profile'
          style={{ position: "absolute", right: 16, bottom: 16 }}
          onPress={() => router.push("/profile/update")}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{auth.nickname}</Text>
          <Text style={styles.introduce}>{auth.introduce}</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab isActive={currentTab === 0} onPress={() => handlePressTab(0)}>
          My Posts
        </Tab>
        <Tab isActive={currentTab === 1} onPress={() => handlePressTab(1)}>
          Liked Posts
        </Tab>
      </View>
      <PagerView
        ref={pagerViewRef}
        initialPage={0}
        style={{ flex: 1 }}
        onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
      >
        <MyFeedList key='1' ref={myFeedListRef} />
        <LikedFeedList key='2' ref={likedFeedListRef} />
      </PagerView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  header: {
    // position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 154,
  },
  avatar: {
    position: "absolute",
    top: 77,
    left: 16,
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
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
