import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { baseUrl } from "@/api/axios";
import AuthRoute from "@/components/hoc/AuthRoute";
import Button from "@/components/ui/Button";
import Tab from "@/components/ui/Tab";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";

export default function MyScreen() {
  const [currentTab, setCurrentTab] = useState(0);

  const handlePressTab = (index: number) => {
    setCurrentTab(index);
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
        />
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{auth.nickname}</Text>
          <Text style={styles.introduce}>{auth.introduce || "Hello"}</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab isActive={currentTab === 0} onPress={() => handlePressTab(0)}>
          Posts
        </Tab>
        <Tab isActive={currentTab === 1} onPress={() => handlePressTab(1)}>
          Liked Posts
        </Tab>
      </View>
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
