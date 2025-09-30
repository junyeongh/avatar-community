import FeedItem from "@/components/feed/FeedItem";
import AuthRoute from "@/components/hoc/AuthRoute";
import KeyboardAvoidingScrollView from "@/components/hoc/KeyboardAvoidingScrollView";
import InputField from "@/components/ui/InputField";
import { colors } from "@/constants";
import { useGetPost } from "@/hooks/queries/usePost";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetailViewScreen() {
  const { id } = useLocalSearchParams();

  const { data: post, isPending, isError } = useGetPost(Number(id));

  if (isPending || isError) return <></>;

  return (
    <AuthRoute>
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <KeyboardAvoidingScrollView>
          <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetailView={true} />
            </View>
            <Text style={styles.commentCount}>
              {post.commentCount} Comment{post.commentCount !== 1 ? "s" : ""}
            </Text>
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <InputField
              rightChild={
                <Pressable style={styles.commentAddButton}>
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
    marginTop: 12,
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
