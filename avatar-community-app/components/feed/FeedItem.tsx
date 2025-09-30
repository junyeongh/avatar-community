import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Profile from "@/components/ui/Profile";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { useDeletePost } from "@/hooks/queries/usePost";
import { Post } from "@/types";

interface FeedItemProps {
  post: Post;
  isDetailView?: boolean;
}

export default function FeedItem({
  post,
  isDetailView = false,
}: FeedItemProps) {
  const { auth } = useAuth();
  const likedUsers = post.likes?.map((like) => Number(like.userId));
  const isLiked = likedUsers?.includes(Number(auth.id));

  const { showActionSheetWithOptions } = useActionSheet();
  const deletePost = useDeletePost();

  const handlePressOption = () => {
    const options = ["Delete", "Edit", "Cancel"]; // 0: "Delete", 1: "Edit", 2: "Cancel"
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0: // Delete
            deletePost.mutate(post.id);
            break;
          case 1: // Edit
            router.push({
              pathname: "/post/update/[id]",
              params: { id: post.id },
            });
            break;
          case 2: // Cancel
            break;
          default:
            break;
        }
      },
    );
  };

  const handlePressFeed = () => {
    if (!isDetailView) {
      router.push({
        pathname: "/post/[id]",
        params: { id: post.id },
      });
    }
  };

  const ContainerComponent = isDetailView ? View : Pressable;

  return (
    <ContainerComponent style={[styles.container]} onPress={handlePressFeed}>
      <View style={[styles.contenContainer]}>
        <Profile
          onPress={() => {}}
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createdAt={post.createdAt}
          option={
            auth.id === post.author.id && (
              <Ionicons
                name='ellipsis-vertical'
                size={24}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
        <Text style={styles.title}>{post.title}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {post.description}
        </Text>
      </View>
      <View style={[styles.menuContainer]}>
        {/* Like */}
        <Pressable style={styles.menu}>
          <Ionicons
            name={isLiked ? "heart-sharp" : "heart-outline"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.likes.length || "Like"}
          </Text>
        </Pressable>
        {/* Comment */}
        <Pressable style={styles.menu}>
          <Octicons name='comment' size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>{post.commentCount || "Comment"}</Text>
        </Pressable>
        {/* View */}
        <Pressable style={styles.menu}>
          <Ionicons name='eye-outline' size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  // containers
  container: {
    backgroundColor: colors.WHITE,
  },
  contenContainer: {
    padding: 16,
  },
  menuContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    borderTopColor: colors.GRAY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  // content containers
  title: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: "600",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: 14,
  },
  // menu container
  menu: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 16,
    width: "33%",
    gap: 4,
  },
  menuText: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  activeMenuText: {
    fontWeight: "500",
    color: colors.ORANGE_600,
  },
});
