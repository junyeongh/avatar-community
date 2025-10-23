import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

import AvatarItem from "@/components/avatar/AvatarItem";
import FixedBottomCTA from "@/components/hoc/FixedBottomCTA";
import Tab from "@/components/ui/Tab";
import { colors } from "@/constants";
import { useGetAvatarItems } from "@/hooks/queries/useGetAvatarItems";

interface AvatarScreenProps {}

export default function AvatarScreen({}: AvatarScreenProps) {
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();

  const items = [hats, faces, tops, bottoms, hands, skins];
  const itemRefs = items.map((_) => useRef<FlatList>(null));

  const pagerViewRef = useRef<PagerView>(null);

  const handlePressTab = (index: number) => {
    setCurrentTab(index);
    pagerViewRef.current?.setPage(index);

    itemRefs[index].current?.scrollToOffset({ offset: 0, animated: true });
  };

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {["Hats", "Faces", "Tops", "Bottoms", "Hands", "Skins"].map(
          (tab, index) => {
            return (
              <Tab
                key={index}
                isActive={currentTab === index}
                onPress={() => handlePressTab(index)}
              >
                {tab}
              </Tab>
            );
          },
        )}
      </View>
      <PagerView
        ref={pagerViewRef}
        initialPage={0}
        style={styles.pagerView}
        onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
      >
        {items.map((item, index) => {
          return (
            <View key={index}>
              <FlatList
                ref={itemRefs[index]}
                data={item}
                keyExtractor={(_, index) => String(index)}
                numColumns={3}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item }) => (
                  <AvatarItem uri={item} isSelected={false} />
                )}
              />
              {currentTab === index && (
                <Pressable
                  onPress={() => {
                    itemRefs[index].current?.scrollToOffset({ offset: 0 });
                  }}
                  style={{
                    position: "absolute",
                    bottom: 100,
                    right: 16,
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

      <FixedBottomCTA label='Save Avatar' onPress={() => {}} />
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
