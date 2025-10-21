import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import InputField from "@/components/ui/InputField";
import Profile from "@/components/ui/Profile";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { useDeleteComment } from "@/hooks/queries/useComment";
import { Comment } from "@/types";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  parentCommentId?: number | null;
  onReply?: () => void;
  onCancelReply?: () => void;
}

export default function CommentItem({
  comment,
  isReply = false,
  parentCommentId,
  onReply,
  onCancelReply,
}: CommentItemProps) {
  const { auth } = useAuth();

  const { showActionSheetWithOptions } = useActionSheet();
  const deleteComment = useDeleteComment();

  const handlePressOption = () => {
    const options = ["Delete", "Cancel"]; // 0: "Delete", 1: "Cancel"
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0: // Delete
            deleteComment.mutate(comment.id);
            break;
          case 1: // Cancel
            break;
          default:
            break;
        }
      },
    );
  };

  const getCommentBackground = () => {
    if (parentCommentId === comment.id) {
      return colors.ORANGE_100;
    }
    if (isReply) {
      return colors.GRAY_50;
    }
    return colors.WHITE;
  };

  return (
    <View
      style={[styles.container, { backgroundColor: getCommentBackground() }]}
    >
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name='arrow-right-bottom'
            size={24}
            color={colors.BLACK}
          />
        )}
        <Profile
          imageUri={comment.isDeleted ? "" : comment.user.imageUri}
          nickname={
            comment.isDeleted ? "(deleted comment)" : comment.user.nickname
          }
          createdAt={comment.createdAt}
          onPress={() => {
            if (!comment.isDeleted) {
              router.push({
                pathname: "/profile/[id]",
                params: { id: comment.user.id },
              });
            }
          }}
          option={
            auth.id === comment.user.id &&
            !comment.isDeleted && (
              <Ionicons
                name='ellipsis-vertical'
                size={24}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      <InputField
        editable={false}
        value={comment.isDeleted ? "(deleted comment)" : comment.content}
      />
      {!comment.isDeleted && !isReply && (
        <View style={styles.replyButtonsContainer}>
          <Pressable onPress={onReply}>
            <Text style={styles.replyButton}>Reply</Text>
          </Pressable>
          {parentCommentId == comment.id && (
            <Pressable onPress={onCancelReply}>
              <Text style={styles.replyCancelButton}>Cancel</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // containers
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  replyButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  // elements
  replyButton: {
    fontWeight: "bold",
    color: colors.ORANGE_600,
    fontSize: 12,
  },
  replyCancelButton: {
    fontWeight: "bold",
    color: colors.BLACK,
    fontSize: 12,
  },
});
