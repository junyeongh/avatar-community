import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet } from "react-native";

import FeedItem from "@/components/feed/FeedItem";
import { colors } from "@/constants";
import { useGetInfinitePosts } from "@/hooks/queries/usePost";

interface FeedListProps {}

export default function FeedList({}: FeedListProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { i18n } = useTranslation();

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();

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
    <FlatList
      key={i18n.language}
      ref={flatListRef}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onRefresh={handleRefresh}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_200,
    paddingBottom: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});
