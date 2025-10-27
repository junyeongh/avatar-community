import { Feather } from "@expo/vector-icons";
import { useScrollToTop } from "@react-navigation/native";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

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

  const flatListRef = useRef<FlatList | null>(null);
  useScrollToTop(flatListRef);

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
        ref={flatListRef}
        data={posts?.pages.flat()}
        renderItem={({ item }) => <FeedItem post={item} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.contentContainer}
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
    // visual properties
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});
