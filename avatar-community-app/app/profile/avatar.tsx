import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import Toast from "react-native-toast-message";

import AvatarItem from "@/components/avatar/AvatarItem";
import FixedBottomCTA from "@/components/hoc/FixedBottomCTA";
import Tab from "@/components/ui/Tab";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { useGetAvatarItems } from "@/hooks/queries/useGetAvatarItems";

interface AvatarScreenProps {}

export default function AvatarScreen({}: AvatarScreenProps) {
  const navigation = useNavigation();

  const { auth, profileMutation } = useAuth();

  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();

  const itemHeaders = ["Hats", "Faces", "Tops", "Bottoms", "Hands", "Skins"];

  const pagerViewRef = useRef<PagerView>(null);
  const items = [hats, faces, tops, bottoms, hands, skins];
  const itemRefs = items.map((_) => useRef<FlatList>(null));

  const [currentTab, setCurrentTab] = useState(0);
  const [avatarItems, setAvatarItems] = useState({
    hatId: auth?.hatId ?? "",
    faceId: auth?.faceId ?? "",
    topId: auth?.topId ?? "",
    bottomId: auth?.bottomId ?? "",
    handId: auth?.handId ?? "",
    skinId: auth?.skinId ?? "",
  });

  const extractId = (item: string) => {
    // extract id of item; e.g. hats/01.png
    const id = (item.split("/").pop() ?? "").split(".")[0];

    return id;
  };

  const handlePressTab = (index: number) => {
    setCurrentTab(index);
    pagerViewRef.current?.setPage(index);

    itemRefs[index].current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleSelectItem = (name: string, item: string) => {
    setAvatarItems((prev) => ({ ...prev, [name]: extractId(item) }));
  };

  const handleSaveAvatar = () => {
    profileMutation.mutate(avatarItems, {
      onSuccess: () =>
        Toast.show({
          type: "success",
          text1: "Avatar Updated Successfully",
          text2: "Your avatar changes have been saved",
        }),
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {itemHeaders.map((tab, index) => {
          return (
            <Tab
              key={index}
              isActive={currentTab === index}
              onPress={() => handlePressTab(index)}
            >
              {tab}
            </Tab>
          );
        })}
      </View>
      <PagerView
        ref={pagerViewRef}
        initialPage={0}
        style={styles.pagerView}
        onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
      >
        {[
          { data: hats, name: "hatId", id: avatarItems.hatId },
          { data: faces, name: "faceId", id: avatarItems.faceId },
          { data: tops, name: "topId", id: avatarItems.topId },
          { data: bottoms, name: "bottomId", id: avatarItems.bottomId },
          { data: hands, name: "handId", id: avatarItems.handId },
          { data: skins, name: "skinId", id: avatarItems.skinId },
        ].map((avatarObj, index) => {
          return (
            <View key={index}>
              <FlatList
                ref={itemRefs[index]}
                data={avatarObj.data}
                keyExtractor={(_, index) => String(index)}
                numColumns={3}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item: uri }) => (
                  <AvatarItem
                    uri={uri}
                    isSelected={extractId(uri) === avatarObj.id}
                    onPress={() => handleSelectItem(avatarObj.name, uri)}
                  />
                )}
              />
              {currentTab === index && (
                <Pressable
                  onPress={() => {
                    itemRefs[index].current?.scrollToOffset({ offset: 0 });
                  }}
                  style={{
                    position: "absolute",
                    bottom: 75,
                    right: 12,
                    width: 64,
                    height: 64,
                    backgroundColor: `${colors.ORANGE_100}77`,
                    borderRadius: 32,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather
                    name='chevron-up'
                    size={36}
                    color={colors.ORANGE_600}
                  />
                </Pressable>
              )}
            </View>
          );
        })}
      </PagerView>

      <FixedBottomCTA label='Save Avatar' onPress={handleSaveAvatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContainer: { flexDirection: "row" },
  flatListContainer: {
    paddingBottom: 100,
    marginTop: 10,
    alignItems: "center",
  },
  pagerView: { flex: 1 },
});
