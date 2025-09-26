import { colors } from "@/constants";
import { Post } from "@/types";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Profile from "./Profile";
import { useAuth } from "@/hooks/queries/useAuth";

interface FeedItemProps {
  post: Post;
}

export default function FeedItem({ post }: FeedItemProps) {
  const { auth } = useAuth();
  const likedUsers = post.likes?.map((like) => Number(like.userId));
  const isLiked = likedUsers?.includes(Number(auth.id));

  return (
    <View style={[styles.container]}>
      <View style={[styles.contenContainer]}>
        <Profile
          onPress={() => {}}
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createdAt={post.createdAt}
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
          <Octicons name="comment" size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>{post.commentCount || "Comment"}</Text>
        </Pressable>
        {/* View */}
        <Pressable style={styles.menu}>
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
    </View>
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
