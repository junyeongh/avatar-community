import { colors } from "@/constants";
import { Post } from "@/types";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface FeedItemProps {
  post: Post;
}

export default function FeedItem({ post, ...props }: FeedItemProps) {
  const isLiked = true;

  return (
    <View style={[styles.container]}>
      <View style={[styles.contenContainer]}>
        <Text style={styles.title}>{post.title}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {post.description}
        </Text>
      </View>
      <View style={[styles.menuContainer]}>
        <Pressable style={styles.menu}>
          <Ionicons
            name={isLiked ? "heart-sharp" : "heart-outline"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            1
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Octicons name="comment" size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>1</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>1</Text>
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
