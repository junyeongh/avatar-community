import { colors } from "@/constants";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

const test_data = [
  {
    id: 1,
    userId: 1,
    title: "test title",
    description:
      "Cupidatat fugiat ea laboris incididunt eiusmod ullamco et Lorem occaecat est. Enim laborum cillum amet ea elit sunt ullamco ea non laboris. Fugiat voluptate anim laborum cupidatat quis. Sunt sunt esse anim cupidatat fugiat. Sit exercitation laboris irure aliquip consectetur eu sit. Ad consectetur elit irure commodo commodo dolor do incididunt commodo sint enim nisi labore reprehenderit. Occaecat commodo cupidatat aliqua esse adipisicing adipisicing aute adipisicing culpa velit non exercitation cupidatat laboris.",
    createdAt: "2025-09-19",
    author: {
      id: 1,
      nickname: "this",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 2,
    userId: 1,
    title: "test title 2",
    description:
      "Cupidatat fugiat ea laboris incididunt eiusmod ullamco et Lorem occaecat est. Enim laborum cillum amet ea elit sunt ullamco ea non laboris. Fugiat voluptate anim laborum cupidatat quis. Sunt sunt esse anim cupidatat fugiat. Sit exercitation laboris irure aliquip consectetur eu sit. Ad consectetur elit irure commodo commodo dolor do incididunt commodo sint enim nisi labore reprehenderit. Occaecat commodo cupidatat aliqua esse adipisicing adipisicing aute adipisicing culpa velit non exercitation cupidatat laboris.",
    createdAt: "2025-09-19",
    author: {
      id: 1,
      nickname: "this",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
];

interface FeedListProps {}

export default function FeedList({}: FeedListProps) {
  return (
    <FlatList
      data={test_data}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
  },
});
