import { useScrollToTop } from "@react-navigation/native";
import { Ref, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import FeedItem from "@/components/feed/FeedItem";
import { colors } from "@/constants";
import { useGetInfiniteLikedPosts } from "@/hooks/queries/usePost";

interface LikedFeedListProps {}

export default function LikedFeedList({}: LikedFeedListProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useGetInfiniteLikedPosts();

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
