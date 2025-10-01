import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import Profile from "@/components/ui/Profile";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { useDeleteComment } from "@/hooks/queries/useComment";
import { Comment } from "@/types";

import InputField from "../ui/InputField";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
}

export default function CommentItem({
  comment,
  isReply = false,
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

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialIcons name='arrow-right' size={24} color={colors.BLACK} />
        )}
        <Profile
          imageUri={comment.isDeleted ? "" : comment.user.imageUri}
          nickname={
            comment.isDeleted ? "(deleted comment)" : comment.user.nickname
          }
          createdAt={comment.createdAt}
          onPress={() => {}}
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
});
