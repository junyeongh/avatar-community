import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { colors } from "@/constants";
import { useGetInfinitePosts } from "@/hooks/queries/usePost";

import FeedItem from "./FeedItem";

interface FeedListProps {}

export default function FeedList({}: FeedListProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useGetInfinitePosts();

  const flatListRef = useRef<FlatList | null>(null);
  useScrollToTop(flatListRef);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});
