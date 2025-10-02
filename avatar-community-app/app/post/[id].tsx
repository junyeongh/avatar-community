import { useLocalSearchParams } from "expo-router";
import { Fragment, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CommentItem from "@/components/comment/CommentItem";
import FeedItem from "@/components/feed/FeedItem";
import AuthRoute from "@/components/hoc/AuthRoute";
import KeyboardAvoidingScrollView from "@/components/hoc/KeyboardAvoidingScrollView";
import InputField from "@/components/ui/InputField";
import { colors } from "@/constants";
import { useCreateComment } from "@/hooks/queries/useComment";
import { useGetPost } from "@/hooks/queries/usePost";
import { CreateCommentDto } from "@/types";

export default function PostDetailViewScreen() {
  const { id } = useLocalSearchParams();

  const [commentContent, setCommentContent] = useState("");
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);

  const { data: post, isPending, isError } = useGetPost(Number(id));
  const createComments = useCreateComment();

  const scrollRef = useRef<ScrollView | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  if (isPending || isError) return <></>;

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };
  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss();
  };

  const handleSubmitComment = () => {
    const commentData: CreateCommentDto = {
      content: commentContent,
      postId: post.id,
    };

    if (parentCommentId) {
      createComments.mutate({ ...commentData, parentCommentId });
      setCommentContent("");
      handleCancelReply();

      return;
    }

    createComments.mutate(commentData);
    setCommentContent("");
    scrollRef.current?.scrollToEnd();
  };

  return (
    <AuthRoute>
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <KeyboardAvoidingScrollView scrollViewRef={scrollRef}>
          <ScrollView
            ref={scrollRef}
            style={styles.scrollViewContainer}
            contentContainerStyle={styles.scrollViewContentContainer}
          >
            <View style={{ marginVertical: 12 }}>
              <FeedItem post={post} isDetailView={true} />
            </View>
            <Text style={styles.commentCount}>
              {post.commentCount} Comment{post.commentCount !== 1 ? "s" : ""}
            </Text>
            {post.comments?.map((comment) => (
              <Fragment key={comment.id}>
                <CommentItem
                  comment={comment}
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                />
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </Fragment>
            ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              value={commentContent}
              returnKeyType='send'
              onSubmitEditing={handleSubmitComment}
              onChangeText={(text) => setCommentContent(text)}
              placeholder={parentCommentId ? "Replying..." : "Comment"}
              rightChild={
                <Pressable
                  style={styles.commentAddButton}
                  onPress={handleSubmitComment}
                  disabled={!commentContent}
                >
                  <Text style={styles.commentAddButtonText}>Add</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  // containers
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollViewContainer: {
    marginBottom: 75,
  },
  scrollViewContentContainer: {
    backgroundColor: colors.GRAY_200,
  },
  commentInputContainer: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    width: "100%",
  },
  // elements
  commentCount: {
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  commentAddButton: {
    backgroundColor: colors.ORANGE_600,
    padding: 8,
    borderRadius: 5,
  },
  commentAddButtonText: {
    color: colors.WHITE,
    fontWeight: "bold",
  },
});
