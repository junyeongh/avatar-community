import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import FeedItem from "@/components/feed/FeedItem";
import SearchInput from "@/components/search/SearchInput";
import { colors } from "@/constants";
import { useGetInfiniteSearchPosts } from "@/hooks/queries/usePost";

export default function SearchFeedList() {
  const [keyword, setKeyword] = useState("");
  const [keywordToSubmit, setKeywordToSubmit] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteSearchPosts(keywordToSubmit);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Feather
            name='arrow-left'
            size={28}
            color='black'
            onPress={() => router.back()}
          />
        </View>
        <SearchInput
          autoFocus
          value={keyword}
          placeholder='Search Post Title'
          onChangeText={(text) => setKeyword(text)}
          onSubmitEditing={() => setKeywordToSubmit(keyword)}
          handleSubmitEditing={() => setKeywordToSubmit(keyword)}
        />
      </View>
      <FlatList
        keyboardDismissMode='on-drag'
        data={posts?.pages.flat()}
        renderItem={({ item }) => <FeedItem post={item} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: useSafeAreaInsets().bottom + 24 },
        ]}
        onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // layout
    flexDirection: "row",
    // dimensions
    height: 44,
    // spacing
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    // appearance (visual properties)
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_200,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});
