import { Feather } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { SvgUri } from "react-native-svg";
import Toast from "react-native-toast-message";

import { baseUrl } from "@/api/axios";
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
  const itemRefs = items.map((_) => useAnimatedRef<Animated.FlatList>());

  const [currentTab, setCurrentTab] = useState(0);
  const [scrollOffsets, setScrollOffsets] = useState<number[]>(
    new Array(items.length).fill(0),
  );
  const [avatarItems, setAvatarItems] = useState({
    hatId: auth?.hatId ?? "",
    faceId: auth?.faceId ?? "",
    topId: auth?.topId ?? "",
    bottomId: auth?.bottomId ?? "",
    handId: auth?.handId ?? "",
    skinId: auth?.skinId ?? "01",
  });

  const extractId = (item: string) => {
    // extract id of item; e.g. hats/01.png
    const id = (item.split("/").pop() ?? "").split(".")[0];

    return id;
  };

  const getAvatarItemUrl = (category: string, id?: string) => {
    if (category === "default" || !Boolean(id)) {
      return `${baseUrl}/default/frame.svg`;
    }

    return `${baseUrl}/items/${category}/${id}.svg`;
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
      onSuccess: () => {
        router.back();
        Toast.show({
          type: "success",
          text1: "Avatar Updated Successfully",
          text2: "Your avatar changes have been saved",
        });
      },
    });
  };

  const SCROLL_THRESHOLD = 200;
  const handleScroll = (index: number, offset: number) => {
    setScrollOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = offset;
      return newOffsets;
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
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          {avatarItems.hatId && (
            <SvgUri
              uri={getAvatarItemUrl("hats", avatarItems.hatId)}
              style={[styles.avatar, { zIndex: 70 }]}
            />
          )}
          {avatarItems.faceId && (
            <SvgUri
              uri={getAvatarItemUrl("faces", avatarItems.faceId)}
              style={[styles.avatar, { zIndex: 60 }]}
            />
          )}
          {avatarItems.topId && (
            <SvgUri
              uri={getAvatarItemUrl("tops", avatarItems.topId)}
              style={[styles.avatar, { zIndex: 50 }]}
            />
          )}
          {avatarItems.bottomId && (
            <SvgUri
              uri={getAvatarItemUrl("bottoms", avatarItems.bottomId)}
              style={[styles.avatar, { zIndex: 40 }]}
            />
          )}
          <SvgUri
            uri={getAvatarItemUrl("default")}
            style={[styles.avatar, { zIndex: 30 }]}
          />
          {avatarItems.skinId && (
            <SvgUri
              uri={getAvatarItemUrl("skins", avatarItems.skinId)}
              style={[styles.avatar, { zIndex: 20 }]}
            />
          )}
          {avatarItems.handId && (
            <SvgUri
              uri={getAvatarItemUrl("hands", avatarItems.handId)}
              style={[styles.avatar, { zIndex: 10 }]}
            />
          )}
        </View>
      </View>
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
                onScroll={(e) =>
                  handleScroll(index, e.nativeEvent.contentOffset.y)
                }
                scrollEventThrottle={16}
                renderItem={({ item: uri }) => (
                  <AvatarItem
                    uri={uri}
                    isSelected={extractId(uri) === avatarObj.id}
                    onPress={() => handleSelectItem(avatarObj.name, uri)}
                  />
                )}
              />
              {scrollOffsets[index] > SCROLL_THRESHOLD && (
                <Pressable
                  onPress={() => {
                    itemRefs[currentTab].current?.scrollToOffset({ offset: 0 });
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
  headerContainer: {
    alignItems: "center",
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 115,
    marginBottom: 115,
  },
  avatarContainer: {
    width: 229,
    height: 229,
    borderRadius: 229,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    backgroundColor: colors.WHITE,
    overflow: "hidden",
  },
  avatar: {
    width: 229,
    height: 229,
    position: "absolute",
  },
  tabContainer: { flexDirection: "row" },
  flatListContainer: {
    paddingBottom: 100,
    marginTop: 10,
    alignItems: "center",
  },
  pagerView: { flex: 1 },
});
